import type { Metadata } from 'next'
import ProviderForm from './ProviderForm'

export const metadata: Metadata = {
  title: 'For Providers',
  description: 'Join 2,400+ specialists already listed on Dementia Care. Reach families actively searching for your expertise.',
}

export default function ForProvidersPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg,#e8f4f2,#ede6d6)' }} className="px-12 pt-32 pb-14">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <span className="w-5 h-px bg-teal block" />
            For Providers
          </div>
          <h1 className="font-serif font-bold text-ink mb-4 tracking-tight leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            Reach families <em className="italic text-teal">actively searching</em> for your expertise
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-xl">
            Over 12,000 families use Dementia Care every month to find verified dementia specialists. A listing puts your practice directly in front of the people who need exactly what you offer.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-12 py-14">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-7">
          {[
            { num: '12,000+', lbl: 'Monthly family searches' },
            { num: '4.2x', lbl: 'More inquiries vs. unclaimed' },
            { num: '48 hrs', lbl: 'Avg. time to verified listing' },
          ].map(s => (
            <div key={s.lbl} className="bg-white rounded-xl p-6 text-center shadow-sm border border-teal/8">
              <div className="font-serif text-3xl font-bold text-teal">{s.num}</div>
              <div className="text-xs text-ink-muted mt-1 uppercase tracking-wide">{s.lbl}</div>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Who Lists on Dementia Care</h2>
        <p className="text-base leading-loose text-ink-soft mb-4">
          Board-certified neurologists, geriatric psychiatrists, neuropsychologists, geriatricians, and memory care nurse practitioners across all 50 states. Individual practitioners, academic medical centers, private practices, and memory care clinics. The one requirement: active dementia or memory care must be a meaningful part of your clinical practice.
        </p>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">What&apos;s Included</h2>
        <ul className="flex flex-col gap-2.5 mb-5">
          {[
            'Full profile page with biography, specialties, and credentials',
            'Insurance panel and accepting status updated on your request',
            'Patient reviews collected and verified by our team',
            'Direct contact button for families',
            'SEO-optimized URL (e.g., dementia-care.org/specialists/your-name-city-state)',
            'Quarterly verification refresh',
          ].map(item => (
            <li key={item} className="text-base leading-relaxed text-ink-soft pl-5 relative">
              <span className="absolute left-0 text-teal font-bold">→</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Listing Options</h2>
        <div className="grid grid-cols-2 gap-5 mb-7">
          {/* Free */}
          <div className="bg-white rounded-xl p-7 border border-teal/10 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-teal mb-3">Standard</div>
            <h4 className="font-serif text-xl font-bold text-ink mb-1">Free Listing</h4>
            <p className="text-sm text-ink-muted mb-0 mt-2">Everything you need to be found.</p>
            <div className="font-serif text-3xl font-bold text-teal my-3">$0 <span className="text-base font-normal text-ink-muted">/ forever</span></div>
            <ul className="flex flex-col gap-2 mb-5">
              {['Full profile with bio and credentials', 'Insurance and accepting status', 'Patient reviews', 'Contact button', 'SEO-optimized listing page'].map(f => (
                <li key={f} className="text-sm text-ink-soft pl-5 relative"><span className="absolute left-0 text-teal font-bold">✓</span>{f}</li>
              ))}
            </ul>
            <a href="#claimForm" className="w-full bg-teal text-white py-3 rounded-lg font-sans text-sm font-medium hover:bg-teal-light transition-colors block text-center">
              Claim Free Listing
            </a>
          </div>
          {/* Premium */}
          <div className="bg-white rounded-xl p-7 border-2 border-teal shadow-lg shadow-teal/15">
            <div className="text-xs font-bold uppercase tracking-widest text-amber mb-3">✦ Premium</div>
            <h4 className="font-serif text-xl font-bold text-ink mb-1">Featured Listing</h4>
            <p className="text-sm text-ink-muted mb-0 mt-2">Priority placement and enhanced visibility.</p>
            <div className="font-serif text-3xl font-bold text-teal my-3">$79 <span className="text-base font-normal text-ink-muted">/ month</span></div>
            <ul className="flex flex-col gap-2 mb-5">
              {['Everything in Free, plus:', 'Priority placement in search results', 'Featured badge on your profile', 'Monthly analytics dashboard', 'Direct phone number display', 'Dedicated account manager'].map(f => (
                <li key={f} className="text-sm text-ink-soft pl-5 relative"><span className="absolute left-0 text-teal font-bold">✓</span>{f}</li>
              ))}
            </ul>
            <a href="#claimForm" className="w-full bg-amber text-white py-3 rounded-lg font-sans text-sm font-medium hover:opacity-90 transition-opacity block text-center">
              Start Free Trial
            </a>
          </div>
        </div>

        <h2 id="claimForm" className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Claim Your Listing</h2>
        <p className="text-base leading-loose text-ink-soft mb-6">
          Fill out the form below and our team will verify your credentials and have your listing live within 48 hours.
        </p>
        <ProviderForm />
      </div>
    </>
  )
}
