import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/40 px-12 py-12 flex justify-between items-center flex-wrap gap-5">
      <div className="font-serif text-2xl font-bold text-teal-light tracking-tight">
        Dementia<span className="text-amber italic" style={{ color: '#d98f42' }}>Care</span>
      </div>
      <ul className="flex gap-7 list-none flex-wrap">
        <li><Link href="/about" className="text-white/40 text-sm hover:text-white/80 transition-colors">About</Link></li>
        <li><Link href="/privacy" className="text-white/40 text-sm hover:text-white/80 transition-colors">Privacy</Link></li>
        <li><Link href="/for-providers" className="text-white/40 text-sm hover:text-white/80 transition-colors">For Providers</Link></li>
        <li><Link href="/contact" className="text-white/40 text-sm hover:text-white/80 transition-colors">Contact</Link></li>
        <li><Link href="/resources" className="text-white/40 text-sm hover:text-white/80 transition-colors">Resources</Link></li>
      </ul>
      <div className="text-xs">© 2025 Dementia Care Directory</div>
    </footer>
  )
}
