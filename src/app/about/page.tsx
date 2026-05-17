import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Dementia Care was founded on a simple belief: no family should spend weeks searching for the right specialist when they\'re already exhausted from caregiving.',
}

export default function AboutPage() {
  return (
    <>
      {/* Static Hero */}
      <div style={{ background: 'linear-gradient(135deg,#e8f4f2,#ede6d6)' }} className="px-12 pt-32 pb-14">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <span className="w-5 h-px bg-teal block" />
            Our Story
          </div>
          <h1 className="font-serif font-bold text-ink mb-4 tracking-tight leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            Built for families in <em className="italic text-teal">their hardest moments</em>
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-xl">
            Dementia Care was founded on a simple belief: no family should spend weeks searching for the right specialist when they&apos;re already exhausted from caregiving.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-2xl mx-auto px-12 py-14">
        <div className="bg-white rounded-xl p-8 mb-7 border-l-4 border-teal shadow-sm shadow-teal/7">
          <p className="text-base leading-relaxed text-ink-soft italic m-0">
            &ldquo;My father was diagnosed with early-onset Alzheimer&apos;s at 61. I called fourteen doctors&apos; offices before finding one who specialized in his form of dementia and was accepting patients. That experience shouldn&apos;t be normal. We built Dementia Care so it never has to be.&rdquo; — Andrew R., Co-Founder
          </p>
        </div>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Why We Exist</h2>
        <p className="text-base leading-loose text-ink-soft mb-4">
          Dementia affects more than 6 million Americans — and the number is growing. Yet finding a qualified specialist who truly understands the condition, accepts your insurance, and has an appointment available within a reasonable timeframe remains one of the most frustrating experiences families face at an already devastating time.
        </p>
        <p className="text-base leading-loose text-ink-soft mb-4">
          General practitioner directories aren&apos;t built for this search. They list thousands of providers with no filtering for specialty, no verification of active dementia practice, and no indication of whether a provider is actually accepting new patients. Families waste hours making calls, hitting dead ends, and often giving up — settling for a doctor who isn&apos;t the right fit. Dementia Care is different. We built a focused, verified directory exclusively for dementia and memory care.
        </p>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">How We Verify Specialists</h2>
        <ul className="flex flex-col gap-2.5 mb-5">
          {[
            'Board certification confirmed through ABPN or AAN records',
            'Active medical license verified with state licensing boards',
            'Dementia-specific practice scope confirmed — only providers with meaningful dementia or memory care in their active caseload',
            'Accepting status, insurance panel, wait times, and contact information verified quarterly',
            'Reviews collected exclusively from verified patient families',
          ].map(item => (
            <li key={item} className="text-base leading-relaxed text-ink-soft pl-5 relative">
              <span className="absolute left-0 text-teal font-bold">→</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Our Numbers</h2>
        <div className="grid grid-cols-3 gap-5 mb-7">
          {[
            { num: '2,400+', lbl: 'Verified specialists' },
            { num: '50', lbl: 'States covered' },
            { num: '12,000+', lbl: 'Families helped' },
          ].map(s => (
            <div key={s.lbl} className="bg-white rounded-xl p-6 text-center shadow-sm border border-teal/8">
              <div className="font-serif text-3xl font-bold text-teal">{s.num}</div>
              <div className="text-xs text-ink-muted mt-1 uppercase tracking-wide">{s.lbl}</div>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Our Team</h2>
        <div className="grid grid-cols-2 gap-5 mb-6">
          {[
            { initials: 'AR', grad: 'linear-gradient(135deg,#2d7a6e,#3a9688)', name: 'Andrew R.', role: 'Co-Founder & CEO', bio: 'Former caregiver and healthcare product leader. Spent 3 years navigating the dementia specialist landscape with his father before founding Dementia Care.' },
            { initials: 'SC', grad: 'linear-gradient(135deg,#c8752a,#d98f42)', name: 'Sarah C.', role: 'Co-Founder & Chief Medical Advisor', bio: 'Geriatric social worker with 15 years supporting dementia families. Oversees all verification standards and clinical content.' },
            { initials: 'MK', grad: 'linear-gradient(135deg,#5a7dc8,#7090d8)', name: 'Marcus K.', role: 'Head of Product', bio: 'Previously built consumer health tools at two digital health companies. Focused on making the search experience as simple and trustworthy as possible.' },
            { initials: 'LP', grad: 'linear-gradient(135deg,#7a5c9a,#9070b8)', name: 'Lisa P.', role: 'Director of Provider Relations', bio: 'Leads relationships with medical centers and individual practitioners. Former practice manager at a leading neurology group.' },
          ].map(m => (
            <div key={m.name} className="bg-white rounded-xl p-6 shadow-sm border border-teal/8">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center font-serif text-lg font-bold text-white mb-3.5" style={{ background: m.grad }}>{m.initials}</div>
              <h4 className="font-serif text-base font-semibold text-ink mb-0.5">{m.name}</h4>
              <div className="text-xs text-teal font-medium mb-2">{m.role}</div>
              <p className="text-sm leading-relaxed text-ink-muted m-0">{m.bio}</p>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Our Commitment</h2>
        <p className="text-base leading-loose text-ink-soft mb-4">
          We will never sell advertising placements that allow providers to appear higher than their merit warrants. Our directory order is determined by quality signals — ratings, review volume, verification completeness, and accepting status — not by who pays us more. Families in crisis deserve a tool they can trust completely.
        </p>
      </div>
    </>
  )
}
