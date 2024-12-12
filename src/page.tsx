'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Car, Share } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between p-4 border-b border-[#B71C1C]">
        <div className="h-12 relative w-40">
          <Image
            src="https://parkapp.ca/cwp_api/uploads/logo/logo-1686162477252.png"
            alt="CANADA-WIDE PARKING"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-[#B71C1C]"
        >
          <Share className="h-6 w-6" />
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-[#B71C1C]" />
          <h1 className="text-2xl font-normal text-[#B71C1C]">Select Plate</h1>
        </div>

        <div className="absolute top-4 right-4">
          <Button 
            className="bg-[#B71C1C] hover:bg-[#B71C1C]/90 text-white rounded-lg px-6 py-2"
            onClick={() => router.push('/add-plate')}
          >
            ADD PLATE
          </Button>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full p-4 text-center text-gray-600 text-sm border-t">
        © 2022 BBits Solutions Inc
      </footer>
    </div>
  )
}

