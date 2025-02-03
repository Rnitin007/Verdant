"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

interface Plant {
  id: string
  name: string
  path: string
  scientificName: string
  category: string
  description: string
  careLevel: string
  waterNeeds: string
  sunlight: string
  height: string
  growthRate: string
  soil: string
  temperature: string
  humidity: string
  propagation: string
  flowering: string
  maintenance: string
}

interface GardenContextType {
  userGarden: Plant[]
  addToGarden: (plant: Plant) => void
  removeFromGarden: (plantId: string) => void
  plants: Plant[]
  searchPlants: (query: string) => Plant[]
}

// Export the GardenContext
export const GardenContext = createContext<GardenContextType>({
  userGarden: [],
  addToGarden: () => {},
  removeFromGarden: () => {},
  plants: [],
  searchPlants: () => []
})

export function GardenProvider({ children }: { children: React.ReactNode }) {
  const [userGarden, setUserGarden] = useState<Plant[]>([])
  const { user } = useUser()
  const [plants] = useState<Plant[]>([
    { 
      id: "1", 
      name: "Monstera Deliciosa", 
      path: "/garden/monstera-deliciosa",
      scientificName: "Monstera deliciosa",
      category: "Indoor",
      description: "Popular tropical plant known for its large, split leaves",
      careLevel: "Moderate",
      waterNeeds: "Moderate",
      sunlight: "Bright indirect light",
      height: "6-8 feet",
      growthRate: "Fast",
      soil: "Well-draining potting mix",
      temperature: "65-85°F",
      humidity: "High",
      propagation: "Stem cuttings",
      flowering: "Rarely flowers indoors",
      maintenance: "Regular pruning and cleaning"
    },
    { 
      id: "2", 
      name: "Snake Plant", 
      path: "/garden/snake-plant",
      scientificName: "Sansevieria trifasciata",
      category: "Indoor",
      description: "Hardy plant with tall, stiff leaves",
      careLevel: "Easy",
      waterNeeds: "Low",
      sunlight: "Any light condition",
      height: "2-4 feet",
      growthRate: "Slow",
      soil: "Well-draining cactus mix",
      temperature: "60-85°F",
      humidity: "Any",
      propagation: "Division or leaf cuttings",
      flowering: "Rare white or cream flowers",
      maintenance: "Minimal care needed"
    },
    // Add more plants as needed
  ])

  // Load garden data when user changes
  useEffect(() => {
    if (user) {
      try {
        const savedGarden = localStorage.getItem(`garden_${user.id}`)
        if (savedGarden) {
          setUserGarden(JSON.parse(savedGarden))
        }
      } catch (error) {
        console.error("Error loading garden data:", error)
        setUserGarden([])
      }
    } else {
      setUserGarden([])
    }
  }, [user])

  // Save garden data when it changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(`garden_${user.id}`, JSON.stringify(userGarden))
      } catch (error) {
        console.error("Error saving garden data:", error)
      }
    }
  }, [userGarden, user])

  const addToGarden = (plant: Plant) => {
    if (!user) return
    if (!userGarden.some(p => p.id === plant.id)) {
      setUserGarden([...userGarden, plant])
    }
  }

  const removeFromGarden = (plantId: string) => {
    if (!user) return
    setUserGarden(userGarden.filter(plant => plant.id !== plantId))
  }

  const searchPlants = (query: string) => {
    return plants.filter(plant => 
      plant.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <GardenContext.Provider value={{ userGarden, addToGarden, removeFromGarden, plants, searchPlants }}>
      {children}
    </GardenContext.Provider>
  )
}

export const useGarden = () => {
  const context = useContext(GardenContext)
  if (!context) {
    throw new Error('useGarden must be used within a GardenProvider')
  }
  return context
}

