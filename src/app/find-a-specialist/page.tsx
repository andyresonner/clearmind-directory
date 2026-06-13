'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { specialists } from '@/data/specialists'
import SpecialistCard from '@/components/SpecialistCard'
import { supabase } from '@/lib/supabase'

// ─── Types ───────────────────────────────────────────────────────────────────
type StepId = 'location' | 'specialty' | 'prefs' | 'results'
const ORDER: StepId[] = ['location', 'specialty', 'prefs', 'results']

type Specialty = 'all' | 'neurologist' | 'geriatric' | 'memory' | 'geriatrician'

const SPECIALTY_OPTIONS: { value: Specialty; label: string; desc: string; icon: string }[] = [
  { value: 'all',          label: 'Show me everything',     desc: 'Browse all dementia-focused specialists', icon: '🔍' },
  { value: 'neurologist',  label: 'Neurologist',            desc: 'Brain & nervous system specialists',      icon: '🧠' },
  { value: 'geriatric',    label: 'Geriatric Psychiatrist', desc: 'Mental health for older adults',          icon: '💬' },
  { value: 'memory',       label: 'Memory Care Specialist', desc: 'Focused on memory disorders',             icon: '📋' },
  { value: 'geriatrician', label: 'Geriatrician',           desc: 'Comprehensive elder care',                icon: '🏥' },
]

const LANGUAGES = ['English', 'Spanish', 'Mandarin', 'Cantonese', 'Korean', 'Portuguese', 'Hebrew', 'Greek']

// ─── Helpers ─────────────────────────────────────────────────────────────────
function stepIdx(id: StepId) { return ORDER.indexOf(id) }

function stepStyle(id: StepId, current: StepId) {
  const diff = stepIdx(id) - stepIdx(current)
  return {
    transform: `translateX(${diff * 110}vw)`,
    transition: 'transform 420ms cubic-bezier(0.16,1,0.3,1)',
  }
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    const city = data.address?.city || data.address?.town || data.address?.village || ''
    const state = data.address?.state || ''
    return [city, state].filter(Boolean).join(', ')
  } catch {
    return ''
  }
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current }: { current: StepId }) {
  const pct = ((stepIdx(current) + 1) / ORDER.length) * 100
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-teal/10">
      <div
        className="h-full bg-teal transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ─── Step wrapper ─────────────────────────────────────────────────────────────
function Step({ id, current, children }: { id: StepId; current: StepId; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={stepStyle(id, current)}
    >
      {children}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function FindASpecialistPage() {
  const [step, setStep]               = useState<StepId>('location')
  const [location, setLocation]       = useState('')
  const [specialty, setSpecialty]     = useState<Specialty | null>(null)
  const [acceptingOnly, setAccepting] = useState(false)
  const [language, setLanguage]       = useState('')
  const [geoLoading, setGeoLoading]   = useState(false)
  const [geoError, setGeoError]       = useState('')
  const [submitted, setSubmitted]     = useState(false)

  const handleKeyRef = useRef<(e: KeyboardEvent) => void>(() => {})

  // Results
  const results = useMemo(() => {
    if (!submitted) return []
    let list = [...specialists]
    if (specialty && specialty !== 'all') list = list.filter(s => s.type === specialty)
    if (location.trim()) {
      const lower = location.trim().toLowerCase()
      list = list.filter(s => s.city.toLowerCase().includes(lower))
    }
    if (acceptingOnly) list = list.filter(s => s.tagsAmber.length > 0)
    return list
  }, [specialty, location, acceptingOnly, submitted])

  function advance(next: StepId) { setStep(next) }

  function handleLocationNext() {
    advance('specialty')
  }

  function handleSpecialtyNext(val: Specialty) {
    setSpecialty(val)
    advance('prefs')
  }

  function handleShowMatches() {
    setSubmitted(true)
    advance('results')
    // Fire-and-forget analytics
    supabase?.from('searches').insert({
      location: location.trim() || null,
      specialty: specialty || 'all',
      accepting_only: acceptingOnly,
      language: language || null,
      results_count: results.length,
      created_at: new Date().toISOString(),
    })
  }

  function reset() {
    setStep('location')
    setLocation('')
    setSpecialty(null)
    setAccepting(false)
    setLanguage('')
    setSubmitted(false)
    setGeoError('')
  }

  function useGeo() {
    if (!navigator.geolocation) { setGeoError('Geolocation not supported'); return }
    setGeoLoading(true)
    setGeoError('')
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const label = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)
        setLocation(label || `${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`)
        setGeoLoading(false)
      },
      () => {
        setGeoError('Could not get your location. Please type it instead.')
        setGeoLoading(false)
      }
    )
  }

  // Keyboard support (stale-closure-safe via ref)
  handleKeyRef.current = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { reset(); return }
    if (e.key === 'Enter') {
      if (step === 'location') handleLocationNext()
      if (step === 'prefs') handleShowMatches()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, location, specialty, acceptingOnly, language])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKeyRef.current(e)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <ProgressBar current={step} />

      {/* Full-viewport container */}
      <div className="h-screen overflow-hidden relative" style={{ paddingTop: 64 }}>

        {/* ── Step 1: Location ─────────────────────────────────────────────── */}
        <Step id="location" current={step}>
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-20" style={{ background: 'linear-gradient(160deg,#e8f4f2 0%,#f5f0e8 60%)' }}>
            <div className="w-full max-w-lg text-center">
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-6">
                <span className="w-5 h-px bg-teal block" />
                Step 1 of 3
                <span className="w-5 h-px bg-teal block" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight mb-3">
                Where are you<br />
                <em className="italic text-teal">looking?</em>
              </h1>
              <p className="text-base text-ink-soft mb-10">We&rsquo;ll find verified specialists near you.</p>

              <div className="bg-white rounded-2xl shadow-lg border border-teal/10 p-2 flex gap-2 mb-4" style={{ boxShadow: '0 8px 40px rgba(45,122,110,0.12)' }}>
                <input
                  type="text"
                  autoFocus
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLocationNext()}
                  placeholder="City, state, or zip code…"
                  className="flex-1 bg-transparent border-none outline-none text-base text-ink placeholder-ink-muted px-4 py-3"
                />
                <button
                  onClick={handleLocationNext}
                  className="bg-teal text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-teal-light transition-colors whitespace-nowrap"
                >
                  Next →
                </button>
              </div>

              <button
                onClick={useGeo}
                disabled={geoLoading}
                className="flex items-center gap-2 mx-auto text-sm text-teal font-medium hover:text-teal-light transition-colors"
              >
                {geoLoading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-teal/30 border-t-teal animate-spin inline-block" />
                ) : (
                  <span>📍</span>
                )}
                {geoLoading ? 'Getting your location…' : 'Use my current location'}
              </button>
              {geoError && <p className="text-xs text-rose-500 mt-2">{geoError}</p>}

              <button
                onClick={handleLocationNext}
                className="mt-6 text-xs text-ink-muted underline decoration-dotted hover:text-ink-soft transition-colors"
              >
                Skip — search everywhere
              </button>
            </div>
          </div>
        </Step>

        {/* ── Step 2: Specialty ─────────────────────────────────────────────── */}
        <Step id="specialty" current={step}>
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-20 bg-white">
            <div className="w-full max-w-2xl">
              <button onClick={() => advance('location')} className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-teal transition-colors mb-8">
                ← Back
              </button>
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
                <span className="w-5 h-px bg-teal block" />
                Step 2 of 3
                <span className="w-5 h-px bg-teal block" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2">
                What type of care<br />
                <em className="italic text-teal">are you looking for?</em>
              </h2>
              <p className="text-base text-ink-soft mb-10">Select one — you can always change this later.</p>

              <div className="grid gap-3">
                {SPECIALTY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleSpecialtyNext(opt.value)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${
                      specialty === opt.value
                        ? 'bg-teal text-white border-teal shadow-md'
                        : 'bg-white text-ink border-teal/15 hover:border-teal/40 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className={`text-xs mt-0.5 ${specialty === opt.value ? 'text-white/70' : 'text-ink-muted'}`}>{opt.desc}</div>
                    </div>
                    <span className={`text-lg opacity-40 ${specialty === opt.value ? 'opacity-100' : ''}`}>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Step>

        {/* ── Step 3: Prefs ─────────────────────────────────────────────────── */}
        <Step id="prefs" current={step}>
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-20" style={{ background: 'linear-gradient(160deg,#f5f0e8 0%,#e8f4f2 100%)' }}>
            <div className="w-full max-w-lg">
              <button onClick={() => advance('specialty')} className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-teal transition-colors mb-8">
                ← Back
              </button>
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
                <span className="w-5 h-px bg-teal block" />
                Step 3 of 3
                <span className="w-5 h-px bg-teal block" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2">
                Any other<br />
                <em className="italic text-teal">preferences?</em>
              </h2>
              <p className="text-base text-ink-soft mb-10">Optional — skip to see all results.</p>

              {/* Accepting only toggle */}
              <div className="bg-white rounded-2xl border border-teal/10 p-5 mb-4 shadow-sm">
                <button
                  onClick={() => setAccepting(v => !v)}
                  className="flex items-center gap-4 w-full text-left"
                >
                  <div className={`w-12 h-7 rounded-full relative transition-colors duration-200 ${acceptingOnly ? 'bg-amber' : 'bg-ink-muted/20'}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${acceptingOnly ? 'left-6' : 'left-1'}`} />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-ink">Accepting new patients only</div>
                    <div className="text-xs text-ink-muted mt-0.5">Filter to specialists with open slots</div>
                  </div>
                </button>
              </div>

              {/* Language preference */}
              <div className="bg-white rounded-2xl border border-teal/10 p-5 mb-10 shadow-sm">
                <div className="text-sm font-medium text-ink mb-3">Language preference</div>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(l => l === lang ? '' : lang)}
                      className={`px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 ${
                        language === lang
                          ? 'bg-teal text-white border-teal'
                          : 'bg-white text-ink-soft border-teal/20 hover:border-teal hover:text-teal'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleShowMatches}
                className="w-full bg-teal text-white text-base font-semibold py-4 rounded-2xl hover:bg-teal-light transition-all hover:-translate-y-0.5 shadow-md"
                style={{ boxShadow: '0 8px 32px rgba(45,122,110,0.25)' }}
              >
                Show my matches →
              </button>

              <p className="text-center text-xs text-ink-muted mt-4">
                Press <kbd className="bg-ink/5 px-1.5 py-0.5 rounded text-ink-soft">Enter</kbd> to search &nbsp;·&nbsp; <kbd className="bg-ink/5 px-1.5 py-0.5 rounded text-ink-soft">Esc</kbd> to start over
              </p>
            </div>
          </div>
        </Step>

        {/* ── Step 4: Results ───────────────────────────────────────────────── */}
        <Step id="results" current={step}>
          <div className="min-h-full bg-white">
            {/* Results header */}
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-teal/10 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div>
                  <span className="font-serif text-lg font-semibold text-ink">
                    {results.length === 0
                      ? 'No specialists found'
                      : `${results.length} specialist${results.length !== 1 ? 's' : ''} found`}
                  </span>
                  <span className="text-sm text-ink-muted ml-3">
                    {[
                      specialty && specialty !== 'all' && SPECIALTY_OPTIONS.find(o => o.value === specialty)?.label,
                      location && `near ${location}`,
                      acceptingOnly && 'accepting new patients',
                    ].filter(Boolean).join(' · ')}
                  </span>
                </div>
                <button
                  onClick={reset}
                  className="text-sm text-teal font-medium border border-teal/30 px-4 py-1.5 rounded-lg hover:bg-teal-pale transition-colors whitespace-nowrap"
                >
                  ← New search
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
              {results.length === 0 ? (
                <div className="text-center py-24">
                  <p className="font-serif text-2xl text-ink mb-3">No specialists found for those filters.</p>
                  <p className="text-sm text-ink-muted mb-8">Try broadening your search or removing a filter.</p>
                  <button
                    onClick={() => { advance('prefs'); setAccepting(false); setLanguage('') }}
                    className="bg-teal text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-teal-light transition-colors"
                  >
                    Adjust preferences
                  </button>
                </div>
              ) : (
                <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))' }}>
                  {results.map((s, i) => (
                    <SpecialistCard key={s.slug} specialist={s} delay={i * 0.05} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Step>
      </div>
    </>
  )
}
