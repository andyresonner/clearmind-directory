'use client'
import { useState } from 'react'

export default function ProviderForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="bg-teal-pale border border-teal/25 rounded-xl p-8 text-center animate-fade-in">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="font-serif text-xl font-bold text-ink mb-2">Thank you!</h3>
        <p className="text-base text-ink-soft">Our team will review your submission and contact you within 48 hours.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-9 shadow-sm border border-teal/8">
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Full Name</label>
        <input type="text" placeholder="Dr. Jane Smith, MD" className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors" />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Specialty</label>
        <select className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors">
          <option>Neurologist</option>
          <option>Geriatric Psychiatrist</option>
          <option>Neuropsychologist</option>
          <option>Geriatrician</option>
          <option>Memory Care Nurse Practitioner</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Practice / Affiliation</label>
        <input type="text" placeholder="e.g. Johns Hopkins Memory Center" className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors" />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">City &amp; State</label>
        <input type="text" placeholder="e.g. Baltimore, MD" className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors" />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Work Email</label>
        <input type="email" placeholder="yourname@practice.com" className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors" />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Listing Type</label>
        <select className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors">
          <option>Free Listing</option>
          <option>Premium Featured Listing</option>
        </select>
      </div>
      <button
        onClick={() => setSubmitted(true)}
        className="w-full bg-teal text-white py-3.5 rounded-lg font-sans text-base font-medium hover:bg-teal-light hover:-translate-y-px transition-all"
      >
        Submit for Verification
      </button>
    </div>
  )
}
