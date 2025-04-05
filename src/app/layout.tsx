import './globals.css'
import type { Metadata } from 'next'
// Remove or comment out the problematic font import
// import { Geist } from 'next/font/google' 

export const metadata: Metadata = {
  title: 'Viral Content Wizard',
  description: 'Create viral short-form videos with AI-powered analysis',
}

// Remove the font configuration
// const geist = Geist({
//   subsets: ['latin'],
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Remove the font className reference */}
      <body className="">
        {children}
      </body>
    </html>
  )
}
