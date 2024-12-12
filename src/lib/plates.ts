'use client'

import { create } from 'zustand'

interface Plate {
  id: string
  number: string
}

interface PlateStore {
  plates: Plate[]
  selectedPlate: Plate | null
  addPlate: (number: string) => void
  updatePlate: (id: string, number: string) => void
  deletePlate: (id: string) => void
  setSelectedPlate: (plate: Plate | null) => void
}

export const usePlateStore = create<PlateStore>((set) => ({
  plates: [],
  selectedPlate: null,
  addPlate: (number) => 
    set((state) => ({
      plates: [...state.plates, { id: Math.random().toString(36).slice(2), number }]
    })),
  updatePlate: (id, number) =>
    set((state) => ({
      plates: state.plates.map(plate => 
        plate.id === id ? { ...plate, number } : plate
      )
    })),
  deletePlate: (id) =>
    set((state) => ({
      plates: state.plates.filter(plate => plate.id !== id)
    })),
  setSelectedPlate: (plate) =>
    set({ selectedPlate: plate })
}))

