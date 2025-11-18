import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aryan Mittal - Portfolio',
  description: 'Portfolio of Aryan Mittal - Founder of Code4Hope, Co-Founder of AidSnap, and Full-Stack Developer specializing in AI/ML, Healthcare Tech, and Fintech.',
  keywords: ['Aryan Mittal', 'Portfolio', 'Code4Hope', 'AidSnap', 'Developer', 'AI/ML', 'Healthcare Tech', 'Fintech', 'Full-Stack'],
  authors: [{ name: 'Aryan Mittal' }],
  creator: 'Aryan Mittal',
  openGraph: {
    title: 'Aryan Mittal - Portfolio',
    description: 'Portfolio of Aryan Mittal - Founder of Code4Hope, Co-Founder of AidSnap, and Full-Stack Developer specializing in AI/ML, Healthcare Tech, and Fintech.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan Mittal - Portfolio',
    description: 'Portfolio of Aryan Mittal - Founder of Code4Hope, Co-Founder of AidSnap, and Full-Stack Developer specializing in AI/ML, Healthcare Tech, and Fintech.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
      <head>
        <meta name="robots" content="index, follow" />
      </head>
      <body className="font-sans overflow-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`body::-webkit-scrollbar { display: none; }`}</style>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
