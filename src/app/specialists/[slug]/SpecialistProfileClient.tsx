'use client'
import { useState } from 'react'
import Link from 'next/link'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Specialist } from '@/data/specialists'
import ShareModal from '@/components/ShareModal'

type ContactType = 'direct' | 'referral'

function ContactSheet({
  specialist: s,
  type,
  onClose,
}: {
  specialist: Specialist
  type: ContactType
  onClose: (submitted: boolean) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Family member or caregiver')
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
        contactType: type,
        name, email, role, message,
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
      <div className="bg-white w-full max-w-lg rounded-t-3xl shadow-2xl animate-slide-up" style={{ maxHeight: '92dvh', overflowY: 'auto' }}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-teal/20" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 px-8 pt-4 pb-5 border-b border-teal/8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-serif text-xl font-bold text-white flex-shrink-0 shadow-md"
            style={{ background: s.color }}
          >
            {s.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-teal uppercase tracking-widest mb-0.5">
              {type === 'direct' ? 'Contact Specialist' : 'Request Referral'}
            </p>
            <p className="font-serif font-semibold text-ink text-base leading-tight truncate">{s.name}</p>
            <p className="text-xs text-ink-muted truncate">{s.affiliation}</p>
          </div>
          <button onClick={() => onClose(false)} className="text-ink-muted hover:text-ink transition-colors text-xl leading-none flex-shrink-0">×</button>
        </div>

        {done ? (
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-teal-pale border-2 border-teal/20 flex items-center justify-center text-3xl mx-auto mb-5">✓</div>
            <h3 className="font-serif text-xl font-bold text-ink mb-2">Request Sent</h3>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs mx-auto">
              {s.name}&apos;s office will contact you at <strong>{email}</strong> within 1–2 business days.
            </p>
            <button
              onClick={() => onClose(true)}
              className="mt-8 bg-teal text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-teal-light transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="px-8 py-6">
            <p className="text-sm text-ink-soft mb-6 leading-relaxed">
              {type === 'direct'
                ? `Fill in your details and ${s.name.split(' ')[1]}'s office will reach out to schedule your appointment.`
                : `We'll forward your referral request directly to ${s.name.split(' ')[1]}'s scheduling team.`}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full border border-teal/20 rounded-xl px-4 py-3 text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border border-teal/20 rounded-xl px-4 py-3 text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-1.5">I am a…</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full border border-teal/20 rounded-xl px-4 py-3 text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
                >
                  <option>Family member or caregiver</option>
                  <option>Patient</option>
                  <option>Referring physician</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-ink-muted uppercase tracking-widest mb-1.5">Brief message <span className="normal-case font-normal text-ink-muted">(optional)</span></label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="e.g. Seeking evaluation for a parent with memory concerns…"
                  rows={3}
                  className="w-full border border-teal/20 rounded-xl px-4 py-3 text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>

            {error && <p className="text-xs text-rose-500 mt-3">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-teal text-white py-3.5 rounded-xl text-sm font-medium hover:bg-teal-light transition-all mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : type === 'direct' ? 'Send Contact Request' : 'Send Referral Request'}
            </button>

            <p className="text-[10px] text-ink-muted text-center mt-3 leading-relaxed">
              Your information is only shared with {s.name}&apos;s practice. We do not sell or share your data.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SpecialistProfileClient({ specialist: s }: { specialist: Specialist }) {
  const [contactSheet, setContactSheet] = useState<ContactType | null>(null)
  const [contactDone, setContactDone] = useState(false)
  const [referralDone, setReferralDone] = useState(false)
  const [showShare, setShowShare] = useState(false)

  function triggerShare() {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('shareSeen')) {
      sessionStorage.setItem('shareSeen', '1')
      setTimeout(() => setShowShare(true), 2000)
    }
  }

  function onSheetClose(type: ContactType) {
    return (submitted: boolean) => {
      setContactSheet(null)
      if (submitted) {
        if (type === 'direct') setContactDone(true)
        if (type === 'referral') setReferralDone(true)
        triggerShare()
      }
    }
  }

  function scrollToReviews() {
    document.getElementById('profile-reviews')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {contactSheet && (
        <ContactSheet
          specialist={s}
          type={contactSheet}
          onClose={onSheetClose(contactSheet)}
        />
      )}

      {/* Breadcrumb */}
      <div className="pt-20 px-12 pb-4 bg-sand border-b border-teal/10">
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/" className="text-teal hover:underline">← Back to Directory</Link>
          <span>/</span>
          <span>{s.name}</span>
        </div>
      </div>

      {/* Profile Hero */}
      <div style={{ background: 'linear-gradient(135deg,#e8f4f2,#ede6d6)' }} className="px-12 pt-16 pb-12">
        <div className="max-w-4xl mx-auto grid gap-8 items-start" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center font-serif text-4xl font-bold text-white flex-shrink-0 shadow-xl"
            style={{ background: s.color }}
          >
            {s.initials}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="font-serif text-3xl font-bold text-ink tracking-tight">{s.name}</h1>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-teal bg-teal-pale border border-teal/20 px-2.5 py-1 rounded-full">
                ✓ Verified
              </span>
            </div>
            <div className="text-base text-teal font-medium mb-3">{s.title} · {s.affiliation}</div>
            <div className="flex gap-2 flex-wrap">
              {s.tags.map(t => (
                <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-teal-pale text-teal border border-teal/15">{t}</span>
              ))}
              {s.tagsAmber.map(t => (
                <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-amber-pale text-amber border border-amber/20">{t}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm min-w-[130px]">
            <div className="font-serif text-4xl font-bold text-ink">{s.rating}</div>
            <div className="text-amber text-base my-1">{s.stars}</div>
            <button onClick={scrollToReviews} className="text-xs text-ink-muted underline decoration-dotted hover:text-teal cursor-pointer">
              {s.reviews} verified reviews
            </button>
          </div>
        </div>
      </div>

      {/* Profile Body */}
      <div className="max-w-4xl mx-auto px-12 py-12 grid gap-10" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Main */}
        <div>
          <section className="mb-9">
            <h3 className="font-serif text-xl font-semibold text-ink mb-3.5 pb-2.5 border-b-2 border-teal-pale">About {s.name}</h3>
            <p className="text-base leading-loose text-ink-soft">{s.bio}</p>
          </section>

          <section className="mb-9">
            <h3 className="font-serif text-xl font-semibold text-ink mb-3.5 pb-2.5 border-b-2 border-teal-pale">Areas of Specialty</h3>
            <div className="flex flex-col gap-2">
              {s.specialties.map(sp => (
                <div key={sp} className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="text-teal font-bold">✓</span> {sp}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-9">
            <h3 className="font-serif text-xl font-semibold text-ink mb-3.5 pb-2.5 border-b-2 border-teal-pale">Insurance Accepted</h3>
            <div className="flex flex-wrap gap-1.5">
              {s.insurance.split(', ').map(ins => (
                <span key={ins} className="text-xs px-2.5 py-1 bg-teal-pale text-teal rounded-full border border-teal/15">{ins}</span>
              ))}
            </div>
          </section>

          <section id="profile-reviews" className="mb-9">
            <h3 className="font-serif text-xl font-semibold text-ink mb-3.5 pb-2.5 border-b-2 border-teal-pale">Patient Reviews</h3>
            {s.reviews_data.map((r, i) => (
              <div key={i} className="bg-sand rounded-xl p-4 mb-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-medium text-sm text-ink">{r.name}</span>
                  <span className="text-amber text-xs">{r.stars}</span>
                </div>
                <p className="text-sm leading-relaxed text-ink-soft italic">&ldquo;{r.text}&rdquo;</p>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          {/* Practice Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-teal/8">
            <h4 className="text-xs font-semibold text-ink-muted mb-3.5 uppercase tracking-widest">Practice Details</h4>
            <div className="flex items-start gap-2.5 py-2 border-b border-teal/5 text-sm text-ink-soft"><span className="text-teal w-4 flex-shrink-0">📍</span>{s.location}</div>
            <div className="flex items-start gap-2.5 py-2 border-b border-teal/5 text-sm text-ink-soft"><span className="text-teal w-4 flex-shrink-0">📞</span>{s.phone}</div>
            <div className="flex items-start gap-2.5 py-2 border-b border-teal/5 text-sm text-ink-soft"><span className="text-teal w-4 flex-shrink-0">⏱</span>Wait time: {s.waitTime}</div>
            <div className="flex items-start gap-2.5 py-2 border-b border-teal/5 text-sm text-ink-soft"><span className="text-teal w-4 flex-shrink-0">🏥</span>Experience: {s.experience}</div>
            <div className="flex items-start gap-2.5 py-2 border-b border-teal/5 text-sm text-ink-soft"><span className="text-teal w-4 flex-shrink-0">🎓</span>{s.education}</div>
            <div className="flex items-start gap-2.5 py-2 text-sm text-ink-soft"><span className="text-teal w-4 flex-shrink-0">🌐</span>{s.languages}</div>

            {contactDone ? (
              <div className="flex items-start gap-2.5 bg-teal-pale border border-teal/25 rounded-xl p-4 text-sm text-teal leading-relaxed w-full mt-3 animate-fade-in">
                <span className="text-lg flex-shrink-0 mt-0.5">✓</span>
                <span>Request sent — the office will contact you within 1–2 business days.</span>
              </div>
            ) : (
              <button
                onClick={() => setContactSheet('direct')}
                className="w-full bg-teal text-white py-3.5 rounded-xl font-sans text-sm font-medium hover:bg-teal-light transition-colors mt-3"
              >
                Contact This Specialist
              </button>
            )}

            {!contactDone && (
              referralDone ? (
                <div className="flex items-start gap-2.5 bg-teal-pale border border-teal/25 rounded-xl p-4 text-sm text-teal leading-relaxed w-full mt-2 animate-fade-in">
                  <span className="text-lg flex-shrink-0 mt-0.5">✓</span>
                  <span>Referral request sent — the office will follow up within 1–2 business days.</span>
                </div>
              ) : (
                <button
                  onClick={() => setContactSheet('referral')}
                  className="w-full bg-transparent text-ink-soft border border-teal/25 py-3 rounded-xl font-sans text-sm hover:border-teal hover:text-teal transition-all mt-2"
                >
                  Request a Referral
                </button>
              )
            )}
          </div>

          {/* Overall Rating */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-teal/8 text-center">
            <h4 className="text-xs font-semibold text-ink-muted mb-3.5 uppercase tracking-widest">Overall Rating</h4>
            <div className="font-serif text-5xl font-bold text-ink leading-none py-2">{s.rating}</div>
            <div className="text-amber text-xl my-1">{s.stars}</div>
            <button onClick={scrollToReviews} className="text-xs text-ink-muted underline decoration-dotted hover:text-teal cursor-pointer">
              {s.reviews} verified reviews
            </button>
          </div>
        </div>
      </div>

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} />
    </>
  )
}
