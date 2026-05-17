import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Whether you\'re a family with questions, a provider wanting to update your listing, or a researcher — we read every message and respond within one business day.',
}

export default function ContactPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg,#e8f4f2,#ede6d6)' }} className="px-12 pt-32 pb-14">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <span className="w-5 h-px bg-teal block" />
            Contact Us
          </div>
          <h1 className="font-serif font-bold text-ink mb-4 tracking-tight leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            We&apos;re here to <em className="italic text-teal">help</em>
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-xl">
            Whether you&apos;re a family with questions, a provider wanting to update your listing, or a researcher — we read every message and respond within one business day.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-12 py-14">
        {/* Contact Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-9">
          {[
            { icon: '💬', title: 'Families & Caregivers', desc: 'Questions about finding a specialist or navigating the directory.', email: 'hello@dementia-care.org' },
            { icon: '🏥', title: 'Providers & Practices', desc: 'Claim or update a listing, or ask about premium features.', email: 'providers@dementia-care.org' },
            { icon: '📰', title: 'Press & Media', desc: 'Interview requests, data inquiries, or partnerships.', email: 'press@dementia-care.org' },
            { icon: '🔒', title: 'Privacy Concerns', desc: 'Data requests or review removal.', email: 'privacy@dementia-care.org' },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-xl p-6 border border-teal/10">
              <div className="text-2xl mb-2.5">{c.icon}</div>
              <h4 className="font-serif text-base font-semibold text-ink mb-1">{c.title}</h4>
              <p className="text-sm text-ink-muted leading-relaxed mb-0">{c.desc}<br /><br /><strong className="text-ink-soft">{c.email}</strong></p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Send Us a Message</h2>
        <ContactForm />

        <div className="bg-white rounded-xl p-8 mt-9 border-l-4 border-teal shadow-sm shadow-teal/7">
          <p className="text-base leading-relaxed text-ink-soft italic m-0">
            Every message goes to a real person — not a support ticket system. If your situation is urgent, say so in your message and we will prioritize your response.
          </p>
        </div>
      </div>
    </>
  )
}
