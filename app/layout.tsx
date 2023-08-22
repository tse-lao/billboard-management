import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import App from './app'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Connect Fast ',
  description: 'Sharing your data quickly and securely',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}  text-gray-900`}>
        <App>
          {children}
        </App>
        </body>
    </html>
  )
}