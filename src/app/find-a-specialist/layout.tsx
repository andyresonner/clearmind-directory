import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find a Dementia Specialist',
  description:
    'Use our guided search to find the right neurologist, geriatric psychiatrist, or memory care specialist for your family — verified, reviewed, and accepting patients.',
}

export default function FindASpecialistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
