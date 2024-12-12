'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col md:flex-row min-h-screen">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <div className="flex-1">
            <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
            <main className="p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

