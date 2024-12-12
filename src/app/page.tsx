'use client'

import { Car, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { usePlateStore } from "@/lib/plates"

export default function Page() {
  const router = useRouter()
  const plates = usePlateStore((state) => state.plates)
  const deletePlate = usePlateStore((state) => state.deletePlate)
  const setSelectedPlate = usePlateStore((state) => state.setSelectedPlate)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-[#B71C1C]" />
            <h1 className="text-2xl font-normal text-[#B71C1C]">Select Plate</h1>
          </div>
          <Button 
            className="bg-[#B71C1C] hover:bg-[#B71C1C]/90 text-white rounded-lg px-6 py-2"
            onClick={() => router.push('/add-plate')}
          >
            ADD PLATE
          </Button>
        </div>

        <div className="space-y-4">
          {plates.map((plate) => (
            <div 
              key={plate.id} 
              className="bg-gray-100 rounded-lg shadow-sm cursor-pointer"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) return
                setSelectedPlate(plate)
                router.push('/select-rate')
              }}
            >
              <div className="flex items-center p-4">
                <div className="flex space-x-2 mr-4 border-r border-gray-300 pr-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-[#B71C1C] hover:text-[#B71C1C]/90"
                    onClick={() => {
                      setSelectedPlate(plate)
                      router.push('/add-plate')
                    }}
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-[#B71C1C] hover:text-[#B71C1C]/90"
                    onClick={() => deletePlate(plate.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <span className="text-xl font-medium text-[#B71C1C]">{plate.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="fixed bottom-0 w-full p-4 text-center text-gray-600 text-sm border-t">
        © 2022 BBits Solutions Inc
      </footer>
    </div>
  )
}

