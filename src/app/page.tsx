'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { specialists } from '@/data/specialists'
import SpecialistCard from '@/components/SpecialistCard'
import FilterBar from '@/components/FilterBar'
import SearchBar from '@/components/SearchBar'
import ShareModal from '@/components/ShareModal'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchDisplay, setSearchDisplay] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortMode, setSortMode] = useState('best')
  const [showShare, setShowShare] = useState(false)

  function handleSearch(term: string) {
    setActiveFilter('all')
    if (!term) {
      setSearchTerm('')
      setSearchDisplay('')
      return
    }
    const lower = term.toLowerCase()
    const hasMatch = specialists.some(s => s.city.toLowerCase().includes(lower))
    if (hasMatch) {
      setSearchTerm(lower)
      setSearchDisplay(term)
    } else {
      setSearchTerm('')
      setSearchDisplay('')
    }
    // Scroll to directory
    setTimeout(() => {
      document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  function clearSearch() {
    setSearchTerm('')
    setSearchDisplay('')
  }

  const filteredSpecialists = useMemo(() => {
    let list = specialists.filter(s => {
      if (activeFilter === 'accepting') return s.tagsAmber.length > 0
      if (activeFilter !== 'all') return s.type === activeFilter
      return true
    })
    if (searchTerm) {
      list = list.filter(s => s.city.toLowerCase().includes(searchTerm))
    }
    if (sortMode === 'rating') {
      list = [...list].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    } else if (sortMode === 'reviews') {
      list = [...list].sort((a, b) => b.reviews - a.reviews)
    }
    return list
  }, [activeFilter, searchTerm, sortMode])

  // Mini preview cards (indices 0, 3, 10)
  const miniCards = [
    { s: specialists[0], colorClass: 'av-teal', gradientStyle: 'linear-gradient(135deg,#2d7a6e,#3a9688)' },
    { s: specialists[3], colorClass: 'av-amber', gradientStyle: 'linear-gradient(135deg,#c8752a,#d98f42)' },
    { s: specialists[10], colorClass: 'av-rose', gradientStyle: 'linear-gradient(135deg,#c45c5c,#d47070)' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen grid grid-cols-2 items-center pt-32 pb-20 px-12 gap-20 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full" style={{ background: 'linear-gradient(135deg,#e8f4f2 0%,#ede6d6 100%)', zIndex: 0 }} />
        {/* Left */}
        <div className="relative z-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-6">
            <span className="w-6 h-px bg-teal block" />
            Trusted by 12,000+ families
          </div>
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-ink mb-6" style={{ fontSize: 'clamp(2.8rem,4.5vw,4.2rem)' }}>
            Find the right <em className="italic text-teal">dementia specialist</em> for your family
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-lg mb-10">
            When memory starts to slip, you deserve a doctor who truly understands. Browse verified neurologists, geriatric psychiatrists, and memory care specialists near you.
          </p>
          <SearchBar onSearch={handleSearch} searchTerm={searchDisplay} />
          <div className="flex gap-8 mt-8">
            <div className="flex flex-col gap-0.5">
              <span className="font-serif text-3xl font-bold text-ink">2,400+</span>
              <span className="text-xs text-ink-muted uppercase tracking-wide">Verified specialists</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-serif text-3xl font-bold text-ink">50</span>
              <span className="text-xs text-ink-muted uppercase tracking-wide">States covered</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-serif text-3xl font-bold text-ink">4.8★</span>
              <span className="text-xs text-ink-muted uppercase tracking-wide">Avg. rating</span>
            </div>
          </div>
        </div>
        {/* Right — mini cards */}
        <div className="relative z-10 flex flex-col gap-4" style={{ animation: 'fadeUp 0.9s 0.2s both ease-out' }}>
          {miniCards.map(({ s, gradientStyle }, i) => (
            <Link
              key={s.slug}
              href={`/specialists/${s.slug}`}
              className={`bg-white rounded-xl px-6 py-5 flex items-center gap-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${i === 1 ? 'ml-8' : ''}`}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl font-bold text-white flex-shrink-0"
                style={{ background: gradientStyle }}
              >
                {s.initials}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-ink">{s.name}</div>
                <div className="text-xs text-ink-muted mt-0.5">{s.title} · {s.affiliation}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-amber text-xs">{s.stars}</span>
                <span className="text-xs text-teal font-medium">{s.city}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <div id="directory" className="bg-sand-dark border-t border-b border-teal/10 px-12 py-7">
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Directory Section */}
      <section className="px-12 py-18 pt-14 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl font-bold text-ink mb-1 tracking-tight">Dementia Specialists</h2>
            <div className="text-sm text-ink-muted">Showing {filteredSpecialists.length} specialist{filteredSpecialists.length !== 1 ? 's' : ''}</div>
          </div>
          <select
            value={sortMode}
            onChange={e => setSortMode(e.target.value)}
            className="border border-teal/20 bg-white text-ink-soft px-3.5 py-2 rounded-lg font-sans text-sm cursor-pointer outline-none"
          >
            <option value="best">Sort: Best Match</option>
            <option value="rating">Sort: Highest Rated</option>
            <option value="reviews">Sort: Most Reviewed</option>
          </select>
        </div>

        {/* Search Result Banner */}
        {searchTerm && searchDisplay && (
          <div className="flex items-center gap-2.5 bg-teal-pale border border-teal/20 rounded-xl px-4 py-3 mb-5 text-sm text-teal animate-fade-in">
            <span>Showing {filteredSpecialists.length} specialist{filteredSpecialists.length !== 1 ? 's' : ''} near {searchDisplay} — </span>
            <button onClick={clearSearch} className="text-teal font-medium underline decoration-dotted ml-auto whitespace-nowrap hover:no-underline">
              Clear search
            </button>
          </div>
        )}

        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))' }}>
          {filteredSpecialists.map((s, i) => (
            <SpecialistCard key={s.slug} specialist={s} delay={i * 0.06} />
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="bg-ink text-white px-12 py-24 relative overflow-hidden">
        <div className="absolute top-[-40px] left-[-20px] font-serif text-white/[0.03] pointer-events-none select-none leading-none" style={{ fontSize: '25rem' }}>&ldquo;</div>
        <div className="grid grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal-light mb-4">
              <span className="w-5 h-px bg-teal-light block" />
              Why Dementia Care
            </div>
            <h2 className="font-serif text-4xl font-bold text-white mb-4 tracking-tight" style={{ fontSize: 'clamp(2rem,3vw,2.8rem)' }}>
              Every listing is <em className="italic text-teal-light">verified</em> and vetted
            </h2>
            <p className="text-base leading-relaxed text-white/60 max-w-xl">
              We don&apos;t just pull from Google Maps. Every specialist on Dementia Care has been credentialed-verified, reviewed by real families, and confirmed to have active dementia-related practice.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { icon: '🔍', title: 'Board Certified', text: 'All specialists verified against ABPN and AAN board certification records.' },
              { icon: '💬', title: 'Real Reviews', text: 'Reviews collected from verified patient families, not anonymous posts.' },
              { icon: '📍', title: 'Up-to-Date Info', text: 'Accepting status, insurance, and contact info refreshed quarterly.' },
              { icon: '🏥', title: 'Niche Focus', text: 'Only specialists with active dementia/memory care in their practice scope.' },
            ].map(p => (
              <div key={p.title} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 hover:bg-teal/[0.15] hover:border-teal/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center text-xl mb-3.5">{p.icon}</div>
                <h4 className="font-serif text-base font-semibold text-white mb-1.5">{p.title}</h4>
                <p className="text-xs leading-relaxed text-white/50">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-12 py-24 bg-teal-pale">
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
          <span className="w-5 h-px bg-teal block" />
          Family Stories
        </div>
        <h2 className="font-serif font-bold text-ink mb-4 tracking-tight" style={{ fontSize: 'clamp(2rem,3vw,2.8rem)' }}>
          Families found the <em className="italic text-teal">right doctor</em>
        </h2>
        <p className="text-base leading-relaxed text-ink-soft max-w-xl mb-14">
          The moments that matter most shouldn&apos;t be spent searching endlessly.
        </p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { quote: '"My mother had been misdiagnosed for two years. Dementia Care helped me find a specialist who identified her Lewy body dementia within one visit."', name: 'Jennifer L.', relation: 'Daughter of patient, Austin TX', grad: 'linear-gradient(135deg,#2d7a6e,#3a9688)', initials: 'JL' },
            { quote: '"The filter for \'accepting new patients\' saved me hours of phone calls. Found Dr. Gutierrez in 10 minutes and she was wonderful with my husband."', name: 'Margaret K.', relation: 'Wife of patient, Seattle WA', grad: 'linear-gradient(135deg,#c8752a,#d98f42)', initials: 'MK' },
            { quote: '"Dementia Care gave me everything in one place — credentials, insurance, reviews. It genuinely made the hardest time a little easier."', name: 'Robert D.', relation: 'Son of patient, Chicago IL', grad: 'linear-gradient(135deg,#c45c5c,#d47070)', initials: 'RD' },
          ].map(t => (
            <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm shadow-teal/7">
              <p className="font-serif italic text-lg leading-relaxed text-ink mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: t.grad }}>{t.initials}</div>
                <div>
                  <div className="font-medium text-sm text-ink">{t.name}</div>
                  <div className="text-xs text-ink-muted">{t.relation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Provider CTA */}
      <section className="px-12 py-24 text-center bg-white">
        <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-teal mb-4">
          <span className="w-5 h-px bg-teal block" />
          For Providers
        </div>
        <h2 className="font-serif font-bold text-ink mb-4 tracking-tight mx-auto max-w-lg" style={{ fontSize: 'clamp(2rem,3vw,2.8rem)' }}>
          Are you a dementia specialist?
        </h2>
        <p className="text-base leading-relaxed text-ink-soft mx-auto max-w-xl mb-10 text-center">
          Join 2,400+ specialists already listed on Dementia Care. Families searching for your expertise are looking right now.
        </p>
        <Link
          href="/for-providers"
          className="inline-block bg-teal text-white px-9 py-4 rounded-xl text-base font-medium hover:bg-teal-light transition-all hover:-translate-y-0.5"
        >
          Claim Your Free Listing
        </Link>
      </section>

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} />
    </>
  )
}
