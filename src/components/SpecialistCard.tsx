'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Specialist } from '@/data/specialists'

export default function SpecialistCard({ specialist: s, delay = 0 }: { specialist: Specialist; delay?: number }) {
  const [referred, setReferred] = useState(false)

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-teal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Card Top */}
      <div className="p-7 pb-5 flex gap-4 items-start border-b border-teal/5">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center font-serif text-2xl font-bold text-white flex-shrink-0"
          style={{ background: s.color }}
        >
          {s.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="font-serif text-lg font-semibold text-ink">{s.name}</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-teal bg-teal-pale border border-teal/20 px-2 py-0.5 rounded-full">
              ✓ Verified
            </span>
          </div>
          <div className="text-sm text-teal font-medium mb-2">{s.title} · {s.affiliation}</div>
          <div className="flex gap-1.5 flex-wrap">
            {s.tags.map(t => (
              <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-teal-pale text-teal border border-teal/15">{t}</span>
            ))}
            {s.tagsAmber.map(t => (
              <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-amber-pale text-amber border border-amber/20">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
          <div className="font-serif text-xl font-bold text-ink">{s.rating}</div>
          <div className="text-amber text-xs">{s.stars}</div>
          <div className="text-xs text-ink-muted">{s.reviews} reviews</div>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-7 py-4">
        <p className="text-sm leading-relaxed text-ink-soft mb-4">
          {s.bio.substring(0, 155)}…
        </p>
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-ink-muted">📍 {s.city}</span>
          <span className="flex items-center gap-1 text-xs text-ink-muted">⏱ Wait: {s.waitTime}</span>
          <span className="flex items-center gap-1 text-xs text-ink-muted">🌐 {s.languages}</span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-7 pb-6 flex gap-2.5">
        <Link
          href={`/specialists/${s.slug}`}
          className="flex-1 bg-teal text-white text-center text-sm font-medium py-2.5 rounded-lg hover:bg-teal-light transition-all hover:-translate-y-px"
        >
          View Full Profile
        </Link>
        {referred ? (
          <span className="inline-flex items-center gap-2 bg-teal-pale border border-teal/20 rounded-lg px-3.5 py-2.5 text-sm text-teal animate-fade-in">
            ✓ Referral request sent.
          </span>
        ) : (
          <button
            onClick={() => setReferred(true)}
            className="bg-transparent text-ink-soft border border-teal/20 text-sm px-4 py-2.5 rounded-lg hover:border-teal hover:text-teal transition-all"
          >
            Request Referral
          </button>
        )}
      </div>
    </div>
  )
}
