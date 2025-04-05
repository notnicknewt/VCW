import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Viral Content Wizard',
  description: 'Create viral short-form videos with AI-powered analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
