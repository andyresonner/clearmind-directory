import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Family Resources',
  description: 'Finding the right specialist is step one. These resources help you understand what comes next — from diagnosis to daily care to long-term planning.',
}

export default function ResourcesPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg,#e8f4f2,#ede6d6)' }} className="px-12 pt-32 pb-14">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
            <span className="w-5 h-px bg-teal block" />
            Family Resources
          </div>
          <h1 className="font-serif font-bold text-ink mb-4 tracking-tight leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            Everything you need to <em className="italic text-teal">navigate this journey</em>
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-xl">
            Finding the right specialist is step one. These resources help you understand what comes next — from diagnosis to daily care to long-term planning.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-12 py-14">
        <h2 className="font-serif text-2xl font-bold text-ink mt-0 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Understanding Dementia</h2>
        {[
          { icon: '🧠', title: 'Types of Dementia: A Plain-Language Guide', desc: "Alzheimer's, Lewy body, frontotemporal, vascular — what each one means, how they differ, and why the distinction matters for finding the right specialist." },
          { icon: '📋', title: 'What to Expect at a First Appointment', desc: 'A step-by-step walkthrough of what a comprehensive dementia evaluation looks like — cognitive testing, imaging, blood work — and how to prepare.' },
          { icon: '🔍', title: 'Early Warning Signs: When to Seek a Specialist', desc: 'The difference between normal aging and early cognitive decline. A practical checklist of symptoms that warrant an evaluation.' },
        ].map(r => <ResourceCard key={r.title} {...r} />)}

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Navigating the Healthcare System</h2>
        {[
          { icon: '📞', title: 'How to Get a Referral to a Dementia Specialist', desc: "Many insurance plans require a primary care referral. Here's exactly what to say to your GP and how to navigate the process if they're resistant." },
          { icon: '💳', title: 'Medicare, Medicaid & Dementia Care: What\'s Covered', desc: 'A clear breakdown of what Medicare Parts A, B, and D cover for dementia diagnosis, treatment, and ongoing care.' },
          { icon: '🗂️', title: '20 Questions to Ask a Dementia Specialist', desc: 'Make the most of every appointment. Covers diagnostic questions, treatment options, clinical trial eligibility, and caregiver resources.' },
        ].map(r => <ResourceCard key={r.title} {...r} />)}

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Caregiver Support</h2>
        {[
          { icon: '❤️', title: 'Caregiver Burnout: Recognizing It and Getting Help', desc: 'Signs of caregiver burnout, how to find respite care, and national resources specifically for dementia caregivers.' },
          { icon: '🏠', title: 'Home Safety for Dementia Patients: A Room-by-Room Guide', desc: 'Practical modifications to reduce fall risk, wandering, and household accidents for someone living with dementia at home.' },
          { icon: '👥', title: 'Finding a Local Support Group', desc: "A guide to finding Alzheimer's Association chapters, online support communities, and disease-specific groups near you." },
        ].map(r => <ResourceCard key={r.title} {...r} />)}

        <h2 className="font-serif text-2xl font-bold text-ink mt-10 mb-3.5 pb-2.5 border-b-2 border-teal-pale tracking-tight">Planning Ahead</h2>
        {[
          { icon: '📄', title: 'Legal Documents Every Dementia Family Needs', desc: 'Power of attorney, healthcare proxy, living will, POLST — what each document does and why the conversation needs to happen sooner than most families think.' },
          { icon: '🏥', title: 'Memory Care Facilities: How to Evaluate and Choose', desc: 'What to look for in a memory care unit — staffing ratios, safety features, activity programming, and the questions to ask on a tour.' },
        ].map(r => <ResourceCard key={r.title} {...r} />)}

        <div className="bg-white rounded-xl p-8 mt-7 border-l-4 border-teal shadow-sm shadow-teal/7">
          <p className="text-base leading-relaxed text-ink-soft italic m-0">
            All resources are reviewed by Sarah C., our Chief Medical Advisor and geriatric social worker with 15 years of dementia care experience. To suggest a topic, email <strong className="not-italic text-ink-soft">hello@dementia-care.org</strong>.
          </p>
        </div>
      </div>
    </>
  )
}

function ResourceCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl px-7 py-6 mb-4 border border-teal/8 shadow-sm hover:shadow-md hover:shadow-teal/10 transition-shadow flex gap-5 items-start">
      <div className="w-12 h-12 rounded-xl bg-teal-pale flex items-center justify-center text-2xl flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-serif text-base font-semibold text-ink mb-1.5">{title}</h4>
        <p className="text-sm leading-relaxed text-ink-muted m-0">{desc}</p>
      </div>
    </div>
  )
}
