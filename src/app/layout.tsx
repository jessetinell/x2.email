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
