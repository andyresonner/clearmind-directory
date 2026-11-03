'use client'
import { useState } from 'react'
import Link from 'next/link'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Specialist } from '@/data/specialists'

function ReferralSheet({
  specialist: s,
  onClose,
}: {
  specialist: Specialist
  onClose: (submitted: boolean) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await addDoc(collection(db, 'contact_requests'), {
        specialistSlug: s.slug,
        specialistName: s.name,
        specialistAffiliation: s.affiliation,
        contactType: 'referral',
        name, email, message,
        createdAt: serverTimestamp(),
      })
      setDone(true)
    } catch (e) {
      console.error(e)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center"
      style={{ background: 'rgba(10,8,6,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(false) }}
    >
      <div className="bg-white w-full max-w-lg rounded-t-3xl shadow-2xl animate-slide-up" style={{ maxHeight: '90dvh', overflowY: 'auto' }}>
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-teal/20" />
        </div>
        <div className="flex items-center gap-4 px-8 pt-4 pb-5 border-b border-teal/8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-serif text-xl font-bold text-white flex-shrink-0 shadow-md"
            style={{ background: s.color }}
          >
            {s.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-teal uppercase tracking-widest mb-0.5">Request Referral</p>
            <p className="font-serif font-semibold text-ink text-base leading-tight truncate">{s.name}</p>
            <p className="text-xs text-ink-muted truncate">{s.affiliation}</p>
          </div>
          <button onClick={() => onClose(false)} className="text-ink-muted hover:text-ink transition-colors text-xl leading-none flex-shrink-0">×</button>
        </div>

        {done ? (
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-teal-pale border-2 border-teal/20 flex items-center justify-center text-3xl mx-auto mb-5">✓</div>
            <h3 className="font-serif text-xl font-bold text-ink mb-2">Referral Request Sent</h3>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs mx-auto">
              {s.name}&apos;s scheduling team will contact you at <strong>{email}</strong> within 1–2 business days.
            </p>
            <button onClick={() => onClose(true)} className="mt-8 bg-teal text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-teal-light transition-colors">Done</button>
          </div>
        ) : (
          <div className="px-8 py-6">
            <p className="text-sm text-ink-soft mb-5 leading-relaxed">
              We&apos;ll forward your request directly to {s.name.split(' ')[1]}&apos;s scheduling team.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-1.5">Your Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                  className="w-full border border-teal/20 rounded-xl px-4 py-3 text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full border border-teal/20 rounded-xl px-4 py-3 text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-1.5">Brief message <span className="normal-case font-normal">(optional)</span></label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3}
                  placeholder="e.g. Seeking evaluation for memory concerns…"
                  className="w-full border border-teal/20 rounded-xl px-4 py-3 text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors resize-none" />
              </div>
            </div>
            {error && <p className="text-xs text-rose-500 mt-3">{error}</p>}
            <button onClick={handleSubmit} disabled={loading}
              className="w-full bg-teal text-white py-3.5 rounded-xl text-sm font-medium hover:bg-teal-light transition-all mt-5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Sending…' : 'Send Referral Request'}
            </button>
            <p className="text-[10px] text-ink-muted text-center mt-3">Your information is only shared with {s.name}&apos;s practice.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SpecialistCard({ specialist: s, delay = 0 }: { specialist: Specialist; delay?: number }) {
  const [showReferral, setShowReferral] = useState(false)
  const [referred, setReferred] = useState(false)

  return (
    <>
      {showReferral && (
        <ReferralSheet
          specialist={s}
          onClose={(submitted) => {
            setShowReferral(false)
            if (submitted) setReferred(true)
          }}
        />
      )}
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
              ✓ Request sent
            </span>
          ) : (
            <button
              onClick={() => setShowReferral(true)}
              className="bg-transparent text-ink-soft border border-teal/20 text-sm px-4 py-2.5 rounded-lg hover:border-teal hover:text-teal transition-all"
            >
              Request Referral
            </button>
          )}
        </div>
      </div>
    </>
  )
}
