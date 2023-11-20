import type { Metadata } from 'next'
import './globals.css'
import { Footer, cn } from 'ui'

export const metadata: Metadata = {
  title: 'Leonard Struck',
  description: 'Vienna-based software developer specializing in web and mobile technologies.',
}

import { GeistSans } from 'geist/font';
import { GeistMono } from 'geist/font';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {process.env.NODE_ENV !== "development" && <Script defer data-domain="leonardstruck.com" src="https://plausible.io/js/script.outbound-links.js" />}

      <body className={cn("flex flex-col", GeistMono.className, GeistSans.className)}>
        <main className="container flex-1 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
