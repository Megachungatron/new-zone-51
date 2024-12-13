'use client'

import React, {useEffect, useState} from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import './globals.css'
import {useRouter} from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter();

  useEffect(() => {
    // Check if the "scanned" cookie exists
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=').map(c => c.trim());
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    if (cookies.scanned) {
      // Redirect to the promotion URL if the cookie is not set
      router.replace('https://parkapp.ca/zone/65abf5a7cbccb4a384daacbe');
    }else{
      // Optionally set the cookie if you want this to persist
      document.cookie = 'scanned=true; path=/; max-age=86400'; // 1 day

    }
  }, [router]);

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

