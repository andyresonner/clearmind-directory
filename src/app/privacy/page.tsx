import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'We understand the sensitivity of what brings you here. This policy explains clearly what we collect, what we don\'t, and how we protect your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg,#e8f4f2,#ede6d6)' }} className="px-12 pt-32 pb-14">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <span className="w-5 h-px bg-teal block" />
            Privacy Policy
          </div>
          <h1 className="font-serif font-bold text-ink mb-4 tracking-tight leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            Your privacy is <em className="italic text-teal">not negotiable</em>
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-xl">
            We understand the sensitivity of what brings you here. This policy explains clearly what we collect, what we don&apos;t, and how we protect your information.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-12 py-14">
        <p className="text-sm text-ink-muted mb-6">Last updated: January 15, 2025</p>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">What We Collect</h2>
        <ul className="flex flex-col gap-2.5 mb-5">
          {[
            'Search queries — city, state, or zip code you enter to find specialists',
            'Contact information — name and email only, if you submit a review or contact a specialist',
            'Usage data — anonymized pages visited and click patterns, never tied to your identity',
            'Device information — browser type and screen size for rendering purposes only',
          ].map(item => (
            <li key={item} className="text-base leading-relaxed text-ink-soft pl-5 relative">
              <span className="absolute left-0 text-teal font-bold">→</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">What We Do Not Collect</h2>
        <ul className="flex flex-col gap-2.5 mb-5">
          {[
            'We do not collect your medical history, diagnosis, or any health data',
            'We do not collect payment information — the directory is free for families',
            'We do not sell or share your information with third parties for marketing',
            'We do not track you across other websites or use advertising cookies',
          ].map(item => (
            <li key={item} className="text-base leading-relaxed text-ink-soft pl-5 relative">
              <span className="absolute left-0 text-teal font-bold">→</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="bg-white rounded-xl p-8 my-7 border-l-4 border-teal shadow-sm shadow-teal/7">
          <p className="text-base leading-relaxed text-ink-soft italic m-0">
            We are not an advertising platform. Our revenue comes from provider listings — not from selling your data or your attention.
          </p>
        </div>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Reviews You Submit</h2>
        <p className="text-base leading-loose text-ink-soft mb-4">
          Reviews are published with only your first name and last initial (e.g., &ldquo;Jennifer L.&rdquo;) and general location. Your full name and email are never displayed publicly. You may request removal at any time by emailing privacy@dementia-care.org.
        </p>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">How We Protect Your Data</h2>
        <p className="text-base leading-loose text-ink-soft mb-4">
          All data is encrypted in transit via TLS and stored in encrypted databases with restricted access. We conduct regular security reviews and follow industry best practices.
        </p>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Your Rights</h2>
        <p className="text-base leading-loose text-ink-soft mb-4">
          You have the right to access, correct, or delete your personal information. Contact privacy@dementia-care.org and we will respond within 5 business days.
        </p>
      </div>
    </>
  )
}
