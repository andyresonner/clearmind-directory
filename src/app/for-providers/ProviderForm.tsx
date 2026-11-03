'use client'
import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function ProviderForm() {
  const [fullName, setFullName]     = useState('')
  const [specialty, setSpecialty]   = useState('Neurologist')
  const [practice, setPractice]     = useState('')
  const [cityState, setCityState]   = useState('')
  const [workEmail, setWorkEmail]   = useState('')
  const [listingType, setListingType] = useState('Free Listing')
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  async function handleSubmit() {
    if (!fullName.trim() || !workEmail.trim() || !practice.trim()) {
      setError('Please fill in your name, practice, and work email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await addDoc(collection(db, 'provider_submissions'), {
        fullName, specialty, practice, cityState, workEmail, listingType,
        status: 'pending',
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
        <h3 className="font-serif text-xl font-bold text-ink mb-2">Thank you!</h3>
        <p className="text-base text-ink-soft">Our team will review your submission and contact you within 48 hours.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-9 shadow-sm border border-teal/8">
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Dr. Jane Smith, MD"
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Specialty</label>
        <select
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        >
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
        <input
          type="text"
          value={practice}
          onChange={e => setPractice(e.target.value)}
          placeholder="e.g. Johns Hopkins Memory Center"
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">City &amp; State</label>
        <input
          type="text"
          value={cityState}
          onChange={e => setCityState(e.target.value)}
          placeholder="e.g. Baltimore, MD"
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Work Email</label>
        <input
          type="email"
          value={workEmail}
          onChange={e => setWorkEmail(e.target.value)}
          placeholder="yourname@practice.com"
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        />
      </div>
      <div className="mb-5">
        <label className="block text-xs font-medium text-ink mb-1.5 uppercase tracking-wide">Listing Type</label>
        <select
          value={listingType}
          onChange={e => setListingType(e.target.value)}
          className="w-full border border-teal/20 rounded-lg px-4 py-3 font-sans text-sm text-ink bg-sand outline-none focus:border-teal focus:bg-white transition-colors"
        >
          <option>Free Listing</option>
          <option>Premium Featured Listing</option>
        </select>
      </div>
      {error && <p className="text-xs text-rose-500 mb-4">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-teal text-white py-3.5 rounded-lg font-sans text-base font-medium hover:bg-teal-light hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting…' : 'Submit for Verification'}
      </button>
    </div>
  )
}
