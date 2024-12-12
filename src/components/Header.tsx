import Image from "next/image"
import { Menu, Share } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-[#B71C1C] bg-white">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-[#B71C1C] md:hidden"
        onClick={onOpenSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className="h-12 relative w-40 mx-auto md:mx-0">
        <Image
          src="https://parkapp.ca/cwp_api/uploads/logo/logo-1686162477252.png"
          alt="CANADA-WIDE PARKING"
          fill 
          className="object-contain object-center md:object-left"
          priority
        />
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-[#B71C1C]"
      >
        <Share className="h-8 w-8 rotate-90" />
      </Button>
    </header>
  )
}

