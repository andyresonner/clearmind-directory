'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="bg-teal-pale border border-teal/25 rounded-xl p-8 text-center animate-fade-in">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="font-serif text-xl font-bold text-ink mb-2">Message sent!</h3>
        <p className="text-base text-ink-soft">We&apos;ll respond within one business day.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-9 shadow-sm border border-teal/8">
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Your Name</label>
        <input type="text" placeholder="Full name" className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors" />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Email Address</label>
        <input type="email" placeholder="your@email.com" className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors" />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">I am a…</label>
        <select className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors">
          <option>Family member or caregiver</option>
          <option>Patient</option>
          <option>Medical provider</option>
          <option>Researcher or journalist</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Message</label>
        <textarea placeholder="How can we help you?" rows={5} className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors resize-y min-h-28" />
      </div>
      <button
        onClick={() => setSubmitted(true)}
        className="w-full bg-teal text-white py-3.5 rounded-lg font-sans text-base font-medium hover:bg-teal-light hover:-translate-y-px transition-all"
      >
        Send Message
      </button>
    </div>
  )
}
