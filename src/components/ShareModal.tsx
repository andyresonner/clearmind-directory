'use client'
import { useEffect, useRef, useState } from 'react'

const SHARE_MSG = "I found this site that helps families find verified dementia specialists — it's free and really well done: dementia-care.org"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isOpen) {
      timerRef.current = setTimeout(onClose, 30000)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isOpen, onClose])

  function handleCopy() {
    navigator.clipboard.writeText(SHARE_MSG).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const waHref = `https://wa.me/?text=${encodeURIComponent(SHARE_MSG)}`

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-ink/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Modal */}
      <div
        className={`fixed z-50 bg-sand rounded-t-2xl px-7 pb-11 pt-8 shadow-2xl transition-transform duration-300
          bottom-0 left-0 right-0
          sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:right-auto sm:w-[480px] sm:rounded-2xl sm:-translate-x-1/2
          ${isOpen
            ? 'translate-y-0 sm:-translate-y-1/2 sm:opacity-100 sm:scale-100'
            : 'translate-y-full sm:translate-y-[-44%] sm:opacity-0 sm:scale-95'
          }`}
      >
        <h3 className="font-serif text-xl font-bold text-ink mb-2">Know someone who needs this?</h3>
        <p className="text-sm text-ink-soft leading-relaxed mb-4">Share Dementia Care with a friend or family member who might be searching.</p>
        <textarea
          className="w-full border border-teal/20 rounded-xl p-3 font-sans text-sm text-ink-soft bg-white resize-none outline-none leading-snug mb-3.5 block focus:border-teal"
          rows={3}
          readOnly
          defaultValue={SHARE_MSG}
        />
        <button
          onClick={handleCopy}
          className="w-full bg-teal text-white py-3.5 rounded-xl font-sans text-sm font-medium hover:bg-teal-light transition-colors mb-2.5 block"
        >
          {copied ? '✓ Copied!' : 'Copy message →'}
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-sans text-sm font-medium text-center block hover:bg-[#1db954] transition-colors"
        >
          Share on WhatsApp
        </a>
        <div
          onClick={onClose}
          className="text-center mt-4 text-sm text-ink-muted cursor-pointer underline decoration-dotted hover:text-teal"
        >
          Maybe later
        </div>
      </div>
    </>
  )
}
