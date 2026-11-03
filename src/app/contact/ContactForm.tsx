'use client'
import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function ContactForm() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [role, setRole]       = useState('Family member or caregiver')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await addDoc(collection(db, 'contact_messages'), {
        name, email, role, message,
        createdAt: serverTimestamp(),
      })
      setSubmitted(true)
    } catch (e) {
      console.error(e)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Full name"
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">I am a…</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        >
          <option>Family member or caregiver</option>
          <option>Patient</option>
          <option>Medical provider</option>
          <option>Researcher or journalist</option>
          <option>Other</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Message</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="How can we help you?"
          rows={5}
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors resize-y min-h-28"
        />
      </div>
      {error && <p className="text-xs text-rose-500 mb-4">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-teal text-white py-3.5 rounded-lg font-sans text-base font-medium hover:bg-teal-light hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </div>
  )
}
