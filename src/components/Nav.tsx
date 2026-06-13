'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  function handleScroll(id: string) {
    if (isHome) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-4 bg-sand/90 backdrop-blur-md border-b border-teal/10">
      <Link href="/" className="font-serif text-2xl font-bold text-teal tracking-tight">
        Dementia<span className="text-amber italic">Care</span>
      </Link>

      <ul className="flex gap-6 list-none items-center">
        <li>
          <button
            onClick={() => handleScroll('why')}
            className="text-ink-soft text-sm font-normal hover:text-teal transition-colors"
          >
            Why Us
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScroll('testimonials')}
            className="text-ink-soft text-sm font-normal hover:text-teal transition-colors"
          >
            Stories
          </button>
        </li>
        <li>
          <Link
            href="/for-providers"
            className="text-sm font-medium text-teal border border-teal/40 px-4 py-2 rounded-md hover:border-teal hover:bg-teal-pale transition-colors"
          >
            List Your Practice
          </Link>
        </li>
        <li>
          <Link
            href="/find-a-specialist"
            className="text-sm font-medium text-white bg-teal px-5 py-2 rounded-md hover:bg-teal-light transition-colors shadow-sm"
          >
            Find a Specialist
          </Link>
        </li>
      </ul>
    </nav>
  )
}
