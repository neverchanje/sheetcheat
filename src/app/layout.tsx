import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ProjectMetadata } from './config';

const inter = Inter({ subsets: ['latin'] })

// Static metadata.
export const metadata: Metadata = ProjectMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
