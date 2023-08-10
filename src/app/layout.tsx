import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Providers } from "@/context/providers";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import '../css/base.scss'

const font = Poppins({ weight: ["400", "700", "900"], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'x2.email',
  description: 'x2.email is a free email forwarding service that allows you to create unlimited email aliases for your domain.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={font.className} suppressHydrationWarning={true}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
