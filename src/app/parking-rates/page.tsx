'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import { ArrowLeft, Share } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { usePlateStore } from "@/lib/plates"

export default function ParkingRatesPage() {
  const router = useRouter()
  const selectedPlate = usePlateStore((state) => state.selectedPlate)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedRate, setSelectedRate] = useState<number | null>(4.00)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!selectedPlate) {
    router.push('/')
    return null
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Calculate end times for different durations
  const getEndTime = (hours: number) => {
    const endTime = new Date(currentTime)
    endTime.setHours(endTime.getHours() + hours)
    return endTime
  }

  const rates = [
    { price: 4.00, time: formatTime(getEndTime(1)), selected: true },
    { price: 8.00, time: formatTime(getEndTime(2)) },
    { price: 12.00, time: formatTime(getEndTime(3)) },
    { price: 15.00, time: formatTime(getEndTime(4)) },
    { price: 20.00, time: formatTime(getEndTime(5)) }
  ]

  return (
    <div className="min-h-screen bg-white">
    
      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#B71C1C] text-3xl font-normal">P</span>
          <h1 className="text-2xl font-normal text-[#B71C1C]">Select Rate</h1>
        </div>

        <div className="space-y-6">
          <div className="text-[#B71C1C]">
            {formatDate(currentTime)}, {formatTime(currentTime)}
          </div>

          <div>
            <div className="text-[#B71C1C] mb-2">Your parking session will end:</div>
            <div className="flex items-center justify-between">
              <div className="text-[#B71C1C] text-xl">Dec 10th 2024</div>
              <div className="text-[#B71C1C] text-4xl font-light">
                {selectedRate === 4.00 ? '12:47 pm' : '1:47 pm'}
              </div>
              <div className="bg-[#B71C1C] text-white px-3 py-1 rounded">Today</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-[#B71C1C]">
              <div>Total (including taxes)</div>
              <div>CA${selectedRate?.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between text-[#B71C1C] mb-4">
              <div>Service Fee</div>
              <div>CA$0.00</div>
            </div>

            <div className="space-y-3">
              {rates.map((rate, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRate(rate.price)}
                  className={`w-full p-4 rounded-lg border text-left flex justify-between items-center ${
                    selectedRate === rate.price 
                      ? 'bg-[#B71C1C] text-white border-[#B71C1C]' 
                      : 'border-[#B71C1C] text-[#B71C1C]'
                  }`}
                >
                  <span>${rate.price.toFixed(2)}</span>
                  <span>{rate.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0">
        <Button 
          className="w-full bg-[#B71C1C] hover:bg-[#B71C1C]/90 text-white py-6 rounded-none text-xl"
        >
          ${selectedRate?.toFixed(2)}
        </Button>
      </div>
    </div>
  )
}

