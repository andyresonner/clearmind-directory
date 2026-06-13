'use client'

import { useState, useMemo } from 'react'
import { specialists } from '@/data/specialists'
import SpecialistCard from '@/components/SpecialistCard'

const CARE_TYPES = [
  { value: 'all',          label: 'Show me everything',        emoji: '🔍' },
  { value: 'neurologist',  label: 'Neurologist',               emoji: '🧠' },
  { value: 'geriatric',    label: 'Geriatric Psychiatrist',    emoji: '💬' },
  { value: 'memory',       label: 'Memory Care Specialist',    emoji: '📋' },
  { value: 'geriatrician', label: 'Geriatrician',              emoji: '🏥' },
] as const

type CareType = typeof CARE_TYPES[number]['value']

export default function FindASpecialistPage() {
  const [careType, setCareType]         = useState<CareType | null>(null)
  const [location, setLocation]         = useState('')
  const [acceptingOnly, setAcceptingOnly] = useState(false)
  const [hasSearched, setHasSearched]   = useState(false)
  const [livePreview, setLivePreview]   = useState('')

  function handleLocationInput(val: string) {
    setLocation(val)
    setLivePreview(val.trim() ? `Searching for specialists in ${val.trim()}…` : '')
  }

  function handleFind() {
    setHasSearched(true)
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  const results = useMemo(() => {
    if (!hasSearched && careType === null) return []
    let list = [...specialists]
    if (careType && careType !== 'all') {
      list = list.filter(s => s.type === careType)
    }
    if (location.trim()) {
      const lower = location.trim().toLowerCase()
      list = list.filter(s => s.city.toLowerCase().includes(lower))
    }
    if (acceptingOnly) {
      list = list.filter(s => s.tagsAmber.length > 0)
    }
    return list
  }, [careType, location, acceptingOnly, hasSearched])

  const showResults = hasSearched || careType !== null

  return (
    <>
      {/* Page hero */}
      <section className="pt-32 pb-16 px-12 text-center" style={{ background: 'linear-gradient(160deg,#e8f4f2 0%,#f5f0e8 60%)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-5">
            <span className="w-5 h-px bg-teal block" />
            Guided Search
            <span className="w-5 h-px bg-teal block" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight mb-5">
            Let&rsquo;s find the right specialist<br />
            <em className="italic text-teal">for your family</em>
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-xl mx-auto">
            We know this search can feel overwhelming. Answer a few simple questions and we&rsquo;ll show you only the specialists who are the right fit — verified, reviewed, and ready to help.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-white border-y border-teal/10 py-4 px-12">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8">
          {[
            '✓ Board-certified specialists only',
            '✓ Real reviews from verified families',
            '✓ Accepting status updated quarterly',
          ].map(signal => (
            <span key={signal} className="text-sm font-medium text-teal">{signal}</span>
          ))}
        </div>
      </div>

      {/* 3-step filter */}
      <section className="py-16 px-12 max-w-4xl mx-auto">
        {/* Step 1 */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
            <h2 className="font-serif text-xl font-semibold text-ink">What type of care are you looking for?</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {CARE_TYPES.map(({ value, label, emoji }) => (
              <button
                key={value}
                onClick={() => { setCareType(value); if (!hasSearched) setHasSearched(true) }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  careType === value
                    ? 'bg-teal text-white border-teal shadow-sm'
                    : 'bg-white text-ink-soft border-teal/20 hover:border-teal hover:text-teal'
                }`}
              >
                <span>{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
            <h2 className="font-serif text-xl font-semibold text-ink">Where are you located?</h2>
          </div>
          <div className="max-w-md">
            <div className="bg-white rounded-xl px-2 py-1.5 flex gap-2 shadow-sm border border-teal/15" style={{ boxShadow: '0 4px 24px rgba(45,122,110,0.10)' }}>
              <input
                type="text"
                value={location}
                onChange={e => handleLocationInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleFind()}
                placeholder="City, state, or zip code…"
                className="flex-1 bg-transparent border-none outline-none text-sm text-ink placeholder-ink-muted px-3 py-2"
              />
              <button
                onClick={handleFind}
                className="bg-teal text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-light transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
            {livePreview && (
              <p className="text-xs text-ink-muted italic mt-2 ml-1">{livePreview}</p>
            )}
          </div>
        </div>

        {/* Step 3 */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
            <h2 className="font-serif text-xl font-semibold text-ink">Any other preferences?</h2>
          </div>
          <button
            onClick={() => { setAcceptingOnly(v => !v); if (!hasSearched) setHasSearched(true) }}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
              acceptingOnly
                ? 'bg-amber/10 text-amber border-amber/40'
                : 'bg-white text-ink-soft border-teal/20 hover:border-teal hover:text-teal'
            }`}
          >
            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${acceptingOnly ? 'bg-amber border-amber' : 'border-ink-muted'}`}>
              {acceptingOnly && <span className="text-white text-xs font-bold">✓</span>}
            </span>
            Accepting new patients only
          </button>
        </div>

        {/* Show results button (if no type selected yet) */}
        {!hasSearched && (
          <button
            onClick={handleFind}
            className="bg-teal text-white font-medium px-8 py-3.5 rounded-xl hover:bg-teal-light transition-colors text-sm shadow-sm"
          >
            Show me all specialists →
          </button>
        )}
      </section>

      {/* Results */}
      {showResults && (
        <section id="results" className="px-12 pb-20 max-w-7xl mx-auto">
          <div className="border-t border-teal/10 pt-12">
            {/* Result summary */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-ink mb-1">
                  {results.length === 0
                    ? 'No specialists found'
                    : `${results.length} specialist${results.length !== 1 ? 's' : ''} match your search`}
                </h2>
                {(careType && careType !== 'all') || location || acceptingOnly ? (
                  <p className="text-sm text-ink-muted">
                    {[
                      careType && careType !== 'all' && CARE_TYPES.find(t => t.value === careType)?.label,
                      location && `near ${location}`,
                      acceptingOnly && 'accepting new patients',
                    ].filter(Boolean).join(' · ')}
                    {' '}
                    <button
                      className="text-teal underline decoration-dotted hover:no-underline ml-1"
                      onClick={() => { setCareType(null); setLocation(''); setLivePreview(''); setAcceptingOnly(false); setHasSearched(false) }}
                    >
                      Clear all
                    </button>
                  </p>
                ) : null}
              </div>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20 text-ink-muted">
                <p className="font-serif text-xl text-ink mb-3">No specialists found for those filters.</p>
                <p className="text-sm mb-6">Try broadening your search — remove a filter or search a larger area.</p>
                <button
                  onClick={() => { setCareType('all'); setLocation(''); setLivePreview(''); setAcceptingOnly(false) }}
                  className="bg-teal text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-teal-light transition-colors"
                >
                  Show all specialists
                </button>
              </div>
            ) : (
              <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))' }}>
                {results.map((s, i) => (
                  <SpecialistCard key={s.slug} specialist={s} delay={i * 0.06} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
