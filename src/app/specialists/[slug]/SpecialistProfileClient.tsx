'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Specialist } from '@/data/specialists'
import ShareModal from '@/components/ShareModal'

export default function SpecialistProfileClient({ specialist: s }: { specialist: Specialist }) {
  const [contactDone, setContactDone] = useState(false)
  const [referralDone, setReferralDone] = useState(false)
  const [showShare, setShowShare] = useState(false)

  function triggerShare() {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('shareSeen')) {
      sessionStorage.setItem('shareSeen', '1')
      setTimeout(() => setShowShare(true), 2000)
    }
  }

  function handleContact() {
    setContactDone(true)
    setReferralDone(true)
    triggerShare()
  }

  function handleReferral() {
    setReferralDone(true)
    triggerShare()
  }

  function scrollToReviews() {
    document.getElementById('profile-reviews')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
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
                <span>Request sent — the specialist&apos;s office will contact you within 1–2 business days.</span>
              </div>
            ) : (
              <button
                onClick={handleContact}
                className="w-full bg-teal text-white py-3.5 rounded-xl font-sans text-sm font-medium hover:bg-teal-light transition-colors mt-3"
              >
                Contact This Specialist
              </button>
            )}

            {!contactDone && (
              referralDone ? (
                <div className="flex items-start gap-2.5 bg-teal-pale border border-teal/25 rounded-xl p-4 text-sm text-teal leading-relaxed w-full mt-2 animate-fade-in">
                  <span className="text-lg flex-shrink-0 mt-0.5">✓</span>
                  <span>Request sent — the specialist&apos;s office will contact you within 1–2 business days.</span>
                </div>
              ) : (
                <button
                  onClick={handleReferral}
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
