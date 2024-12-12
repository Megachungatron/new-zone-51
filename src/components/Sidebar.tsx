import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-30 md:relative md:translate-x-0`}>
      <Button 
        variant="ghost" 
        className="flex items-center justify-start text-[#B71C1C] hover:bg-gray-100 hover:text-[#B71C1C] px-4 py-2 m-4"
      >
        <ArrowRight className="mr-2 h-5 w-5" />
        <span className="text-lg">Sign up / Log in</span>
      </Button>
      <Button
        variant="ghost"
        className="absolute top-2 right-2 md:hidden"
        onClick={onClose}
      >
        X
      </Button>
    </div>
  )
}

