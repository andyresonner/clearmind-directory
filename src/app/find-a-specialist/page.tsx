'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { specialists } from '@/data/specialists'
import SpecialistCard from '@/components/SpecialistCard'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// ─── Types ───────────────────────────────────────────────────────────────────
type StepId = 'who' | 'concern' | 'location' | 'results'
const ORDER: StepId[] = ['who', 'concern', 'location', 'results']

type Who = 'myself' | 'parent' | 'spouse' | 'other'

const WHO_OPTIONS: { value: Who; emoji: string; label: string; sub: string }[] = [
  { value: 'myself',  emoji: '👤', label: 'Myself',               sub: 'I\'m experiencing memory or cognitive changes' },
  { value: 'parent',  emoji: '🫂', label: 'A parent',             sub: 'My mother or father needs evaluation' },
  { value: 'spouse',  emoji: '💑', label: 'A spouse or partner',  sub: 'My partner is showing concerning symptoms' },
  { value: 'other',   emoji: '👥', label: 'Someone else',         sub: 'A family member or friend needs care' },
]

type Concern = 'memory' | 'confusion' | 'behavior' | 'alzheimers' | 'other-dx' | 'second-opinion'

const CONCERN_OPTIONS: { value: Concern; emoji: string; label: string; sub: string }[] = [
  { value: 'memory',        emoji: '🧠', label: 'Memory loss or forgetfulness',      sub: 'Repeating questions, misplacing items' },
  { value: 'confusion',     emoji: '😕', label: 'Confusion or disorientation',       sub: 'Getting lost, trouble with dates or time' },
  { value: 'behavior',      emoji: '💬', label: 'Personality or behavior changes',   sub: 'Mood swings, withdrawal, or irritability' },
  { value: 'alzheimers',    emoji: '🩺', label: "Diagnosed with Alzheimer's",        sub: 'Need specialist care or closer monitoring' },
  { value: 'other-dx',      emoji: '📋', label: 'Another dementia diagnosis',        sub: 'Lewy body, FTD, vascular, or other' },
  { value: 'second-opinion',emoji: '🔍', label: 'Seeking a second opinion',          sub: 'Want to confirm or challenge a diagnosis' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
function stepIdx(id: StepId) { return ORDER.indexOf(id) }

function stepStyle(id: StepId, current: StepId) {
  const diff = stepIdx(id) - stepIdx(current)
  return {
    transform: `translateX(${diff * 110}vw)`,
    transition: 'transform 420ms cubic-bezier(0.16,1,0.3,1)',
  }
}

function locationHeading(who: Who | null) {
  switch (who) {
    case 'myself':  return { q: 'Where are', em: 'you located?' }
    case 'parent':  return { q: 'Where does your', em: 'parent live?' }
    case 'spouse':  return { q: 'Where does your', em: 'partner live?' }
    default:        return { q: 'Where is your', em: 'loved one located?' }
  }
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    const city  = data.address?.city || data.address?.town || data.address?.village || ''
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
      <div className="h-full bg-teal transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
    </div>
  )
}

// ─── Step wrapper ─────────────────────────────────────────────────────────────
function Step({ id, current, children }: { id: StepId; current: StepId; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-y-auto" style={stepStyle(id, current)}>
      {children}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function FindASpecialistPage() {
  const [step, setStep]           = useState<StepId>('who')
  const [who, setWho]             = useState<Who | null>(null)
  const [concerns, setConcerns]   = useState<Concern[]>([])
  const [location, setLocation]   = useState('')
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError]   = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleKeyRef = useRef<(e: KeyboardEvent) => void>(() => {})

  // Results: filter by location only (specialty/prefs removed from flow)
  const results = useMemo(() => {
    if (!submitted) return []
    let list = [...specialists]
    if (location.trim()) {
      const lower = location.trim().toLowerCase()
      list = list.filter(s =>
        s.city.toLowerCase().includes(lower) ||
        s.state.toLowerCase().includes(lower)
      )
    }
    return list
  }, [location, submitted])

  function advance(next: StepId) { setStep(next) }

  function handleWhoSelect(val: Who) {
    setWho(val)
    // brief visual pause so the selected card registers before sliding
    setTimeout(() => advance('concern'), 280)
  }

  function toggleConcern(val: Concern) {
    setConcerns(prev => prev.includes(val) ? prev.filter(c => c !== val) : [...prev, val])
  }

  function handleShowMatches() {
    setSubmitted(true)
    advance('results')
    addDoc(collection(db, 'searches'), {
      who: who || null,
      concerns,
      location: location.trim() || null,
      createdAt: serverTimestamp(),
    }).catch(() => {})
  }

  function reset() {
    setStep('who')
    setWho(null)
    setConcerns([])
    setLocation('')
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

  handleKeyRef.current = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { reset(); return }
    if (e.key === 'Enter') {
      if (step === 'concern') advance('location')
      if (step === 'location') handleShowMatches()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, who, concerns, location])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKeyRef.current(e)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const locHeading = locationHeading(who)

  return (
    <>
      <ProgressBar current={step} />

      <div className="h-screen overflow-hidden relative" style={{ paddingTop: 64 }}>

        {/* ── Step 1: Who ──────────────────────────────────────────────────── */}
        <Step id="who" current={step}>
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-20" style={{ background: 'linear-gradient(160deg,#e8f4f2 0%,#f5f0e8 60%)' }}>
            <div className="w-full max-w-lg">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-6">
                  <span className="w-5 h-px bg-teal block" />
                  Step 1 of 3
                  <span className="w-5 h-px bg-teal block" />
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight mb-3">
                  Who are you<br />
                  <em className="italic text-teal">searching for?</em>
                </h1>
                <p className="text-base text-ink-soft">We&rsquo;re here to help. Let&rsquo;s start with who needs care.</p>
              </div>

              <div className="grid gap-3">
                {WHO_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleWhoSelect(opt.value)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      who === opt.value
                        ? 'bg-teal text-white border-teal shadow-lg'
                        : 'bg-white text-ink border-teal/15 hover:border-teal/40'
                    }`}
                    style={who === opt.value ? { boxShadow: '0 8px 32px rgba(45,122,110,0.25)' } : {}}
                  >
                    <span className="text-3xl flex-shrink-0 leading-none">{opt.emoji}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-base">{opt.label}</div>
                      <div className={`text-sm mt-0.5 ${who === opt.value ? 'text-white/75' : 'text-ink-muted'}`}>{opt.sub}</div>
                    </div>
                    <span className={`text-lg opacity-30 ${who === opt.value ? 'opacity-100 text-white' : ''}`}>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Step>

        {/* ── Step 2: Concern ──────────────────────────────────────────────── */}
        <Step id="concern" current={step}>
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-20 bg-white">
            <div className="w-full max-w-lg">
              <button onClick={() => advance('who')} className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-teal transition-colors mb-8">
                ← Back
              </button>
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
                <span className="w-5 h-px bg-teal block" />
                Step 2 of 3
                <span className="w-5 h-px bg-teal block" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink leading-tight mb-3">
                What are they<br />
                <em className="italic text-teal">experiencing?</em>
              </h2>
              <p className="text-base text-ink-soft mb-8">Select everything that applies — or skip to see all specialists.</p>

              <div className="grid gap-3 mb-8">
                {CONCERN_OPTIONS.map(opt => {
                  const selected = concerns.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleConcern(opt.value)}
                      className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl border text-left transition-all duration-150 ${
                        selected
                          ? 'bg-teal-pale border-teal/40 shadow-sm'
                          : 'bg-white border-teal/10 hover:border-teal/30'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                        selected ? 'bg-teal border-teal' : 'border-teal/25'
                      }`}>
                        {selected && <span className="text-white text-xs font-bold leading-none">✓</span>}
                      </span>
                      <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-ink">{opt.label}</div>
                        <div className="text-xs text-ink-muted mt-0.5">{opt.sub}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => advance('location')}
                className="w-full bg-teal text-white text-base font-semibold py-4 rounded-2xl hover:bg-teal-light transition-all hover:-translate-y-0.5"
                style={{ boxShadow: '0 8px 32px rgba(45,122,110,0.25)' }}
              >
                {concerns.length > 0 ? `Continue with ${concerns.length} selected →` : 'Skip — show all specialists →'}
              </button>
            </div>
          </div>
        </Step>

        {/* ── Step 3: Location ─────────────────────────────────────────────── */}
        <Step id="location" current={step}>
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-20" style={{ background: 'linear-gradient(160deg,#f5f0e8 0%,#e8f4f2 100%)' }}>
            <div className="w-full max-w-lg text-center">
              <button onClick={() => advance('concern')} className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-teal transition-colors mb-8 mx-auto">
                ← Back
              </button>
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-6">
                <span className="w-5 h-px bg-teal block" />
                Step 3 of 3
                <span className="w-5 h-px bg-teal block" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight mb-3">
                {locHeading.q}<br />
                <em className="italic text-teal">{locHeading.em}</em>
              </h2>
              <p className="text-base text-ink-soft mb-10">We&rsquo;ll find verified specialists nearby.</p>

              <div className="bg-white rounded-2xl shadow-lg border border-teal/10 p-2 flex gap-2 mb-4" style={{ boxShadow: '0 8px 40px rgba(45,122,110,0.12)' }}>
                <input
                  type="text"
                  autoFocus
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleShowMatches()}
                  placeholder="City, state, or zip code…"
                  className="flex-1 bg-transparent border-none outline-none text-base text-ink placeholder-ink-muted px-4 py-3"
                />
                <button
                  onClick={handleShowMatches}
                  className="bg-teal text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-teal-light transition-colors whitespace-nowrap"
                >
                  Show matches →
                </button>
              </div>

              {location.trim() && (
                <p className="text-xs text-teal italic mt-2 mb-4">
                  Searching for specialists in {location.trim()}…
                </p>
              )}

              <button
                onClick={useGeo}
                disabled={geoLoading}
                className="flex items-center gap-2 mx-auto text-sm text-teal font-medium hover:text-teal-light transition-colors"
              >
                {geoLoading
                  ? <span className="w-4 h-4 rounded-full border-2 border-teal/30 border-t-teal animate-spin inline-block" />
                  : <span>📍</span>}
                {geoLoading ? 'Getting your location…' : 'Use my current location'}
              </button>
              {geoError && <p className="text-xs text-rose-500 mt-2">{geoError}</p>}

              <button
                onClick={handleShowMatches}
                className="mt-6 text-xs text-ink-muted underline decoration-dotted hover:text-ink-soft transition-colors"
              >
                Skip — search everywhere
              </button>
            </div>
          </div>
        </Step>

        {/* ── Step 4: Results ───────────────────────────────────────────────── */}
        <Step id="results" current={step}>
          <div className="min-h-full bg-white">
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-teal/10 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div>
                  <span className="font-serif text-lg font-semibold text-ink">
                    {results.length === 0
                      ? 'No specialists found'
                      : `${results.length} specialist${results.length !== 1 ? 's' : ''} found`}
                  </span>
                  {location && (
                    <span className="text-sm text-ink-muted ml-3">near {location}</span>
                  )}
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
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="font-serif text-2xl text-ink mb-3">No specialists found near {location}.</p>
                  <p className="text-sm text-ink-muted mb-8">Try a nearby city, a state name, or search everywhere.</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => advance('location')}
                      className="bg-teal text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-teal-light transition-colors"
                    >
                      Change location
                    </button>
                    <button
                      onClick={() => { setLocation(''); setSubmitted(false); setTimeout(() => { setSubmitted(true); advance('results') }, 50) }}
                      className="border border-teal/30 text-teal text-sm font-medium px-6 py-3 rounded-xl hover:bg-teal-pale transition-colors"
                    >
                      Search everywhere
                    </button>
                  </div>
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
