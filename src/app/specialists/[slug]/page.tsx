import { specialists } from '@/data/specialists'
import { notFound } from 'next/navigation'
import SpecialistProfileClient from './SpecialistProfileClient'

export function generateStaticParams() {
  return specialists.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const s = specialists.find(x => x.slug === params.slug)
  if (!s) return {}
  return {
    title: s.name,
    description: s.bio.slice(0, 160),
    openGraph: {
      title: `${s.name} — Dementia Care`,
      description: s.bio.slice(0, 160),
    },
  }
}

export default function SpecialistPage({ params }: { params: { slug: string } }) {
  const s = specialists.find(x => x.slug === params.slug)
  if (!s) notFound()
  return <SpecialistProfileClient specialist={s} />
}
