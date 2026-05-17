'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound() {
  const router = useRouter()
  const [count, setCount] = useState(8)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(interval)
          router.push('/')
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-sand">
      <div className="font-serif font-bold text-teal leading-none mb-6" style={{ fontSize: 'clamp(6rem,15vw,12rem)' }}>404</div>
      <h1 className="font-serif text-2xl font-bold text-ink mb-3 max-w-lg tracking-tight">
        This page doesn&apos;t exist — but the right specialist does.
      </h1>
      <p className="text-base text-ink-soft mb-2 max-w-md leading-relaxed">
        We couldn&apos;t find what you were looking for. Head back to the directory to find a verified dementia specialist near you.
      </p>
      <p className="text-sm text-ink-muted mb-10">Redirecting to the homepage in {count} second{count !== 1 ? 's' : ''}…</p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-teal text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-teal-light transition-colors"
        >
          Back to Directory
        </Link>
        <Link
          href="/contact"
          className="bg-transparent text-ink-soft border border-teal/25 px-8 py-3.5 rounded-xl text-sm hover:border-teal hover:text-teal transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
