import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: { default: 'Dementia Care — Find Dementia Specialists Near You', template: '%s — Dementia Care' },
  description: 'Find verified dementia specialists near you — neurologists, geriatric psychiatrists, and memory care doctors across all 50 states. Free to search, family-focused.',
  metadataBase: new URL('https://www.dementia-care.org'),
  openGraph: {
    siteName: 'Dementia Care',
    type: 'website',
    images: [{ url: '/og-default.svg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <meta name="theme-color" content="#2d7a6e" />
      </head>
      <body className="font-sans font-light text-ink bg-sand">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
