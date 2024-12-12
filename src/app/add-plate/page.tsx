'use client'

import { ArrowLeft, Car } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { usePlateStore } from "@/lib/plates"
import { FormEvent, useEffect, useState } from "react"

export default function AddPlatePage() {
  const router = useRouter()
  const addPlate = usePlateStore((state) => state.addPlate)
  const updatePlate = usePlateStore((state) => state.updatePlate)
  const selectedPlate = usePlateStore((state) => state.selectedPlate)
  const [plateNumber, setPlateNumber] = useState('')

  useEffect(() => {
    if (selectedPlate) {
      setPlateNumber(selectedPlate.number)
    }
  }, [selectedPlate])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedPlate) {
      updatePlate(selectedPlate.id, plateNumber)
    } else {
      addPlate(plateNumber)
    }
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#B71C1C] px-2 mt-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-black hover:text-black/90"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-4">
          <Car className="h-6 w-6 text-[#B71C1C]" />
          <h1 className="text-2xl font-normal text-[#B71C1C]">
            {selectedPlate ? 'Edit Plate' : 'Add Plate'}
          </h1>
        </div>

        <p className="text-base text-gray-700 mb-8">
          You can add many cars as you want, organize and always have them in your hands.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="New Plate *"
            className="w-full border-gray-300 rounded-md"
            required
          />
          
          <Button 
            type="submit"
            className="w-full bg-[#B71C1C] hover:bg-[#B71C1C]/90 text-white py-3 rounded-lg text-[15px]"
          >
            {selectedPlate ? 'UPDATE PLATE' : 'ADD PLATE'}
          </Button>
        </form>
      </main>

      <footer className="fixed bottom-0 w-full p-4 text-center text-gray-600 text-sm border-t">
        © 2022 BBits Solutions Inc
      </footer>
    </div>
  )
}

