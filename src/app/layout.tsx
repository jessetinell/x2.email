import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from "@/context/providers";
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'xmin.email',
  description: 'xmin.email is a free email forwarding service that allows you to create unlimited email aliases for your domain.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
