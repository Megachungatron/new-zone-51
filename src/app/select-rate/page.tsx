'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import { ArrowLeft, Share } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { usePlateStore } from "@/lib/plates"

export default function SelectRatePage() {
  const router = useRouter()
  const selectedPlate = usePlateStore((state) => state.selectedPlate)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedRate, setSelectedRate] = useState(4.00)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!selectedPlate) {
      router.push('/')
    }
  }, [selectedPlate, router])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }).toLowerCase()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getEndTime = (hours: number) => {
    const endTime = new Date(currentTime)
    endTime.setHours(endTime.getHours() + hours)
    return endTime
  }

  const rates = [
    { price: 4.00, time: formatTime(getEndTime(1)) },
    { price: 8.00, time: formatTime(getEndTime(2)) },
    { price: 12.00, time: formatTime(getEndTime(3)) },
    { price: 15.00, time: formatTime(getEndTime(4)) },
    { price: 20.00, time: formatTime(getEndTime(5)) }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {selectedPlate ? (
        <>
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
          <main className="flex-grow container mx-auto px-6 py-6 pb-20">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#B71C1C] text-3xl font-normal">P</span>
              <h1 className="text-2xl font-normal text-[#B71C1C]">Select Rate</h1>
            </div>

            <div className="text-[#B71C1C] mb-4 text-sm">
              {formatDate(currentTime)}, {formatTime(currentTime)}
            </div>

            <div className="mb-6">
              <div className="text-[#B71C1C] mb-1 text-sm">Your parking session will end:</div>
              <div className="flex items-center justify-between">
                <div className="text-[#B71C1C] text-lg">Dec 10th 2024</div>
                <div className="text-[#B71C1C] text-4xl font-light">
                  {rates.find(rate => rate.price === selectedRate)?.time}
                </div>
                <div className="bg-[#B71C1C] text-white px-3 py-1 rounded text-xs">Today</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-[#B71C1C] mb-1 text-sm">
                <span>Total (including taxes)</span>
                <span>CA${selectedRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#B71C1C] text-sm">
                <span>Service Fee</span>
                <span>CA$0.00</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {rates.map((rate, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRate(rate.price)}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between items-start ${
                    selectedRate === rate.price 
                      ? 'bg-[#B71C1C] text-white' 
                      : 'border-[#B71C1C] text-[#B71C1C]'
                  }`}
                >
                  <span className="text-sm">${rate.price.toFixed(2)}</span>
                  <span className="text-xs">{rate.time}</span>
                </button>
              ))}
            </div>

            <Button 
              className="w-full bg-[#B71C1C] hover:bg-[#B71C1C]/90 text-white py-6 rounded-none text-xl"
              onClick={() => router.push('/payment')}
            >
              ${selectedRate.toFixed(2)}
            </Button>
          </main>
          <footer className="p-4 text-center text-gray-600 text-xs">
            © 2022 BBits Solutions Inc
          </footer>
        </>
      ) : null}
    </div>
  )
}

