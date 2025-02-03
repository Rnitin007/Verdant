"use client"

import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { GardenContext } from "@/context/garden-context"

export function GardenList() {
  const { userGarden, removeFromGarden } = useContext(GardenContext)

  if (userGarden.length === 0) {
    return <p>Your garden is empty. Add some plants from the Plant Database!</p>
  }

  return (
    <ul className="space-y-2">
      {userGarden.map((plant) => (
        <li key={plant.id} className="flex justify-between items-center p-2 bg-secondary rounded">
          <div>
            <h3 className="font-medium">{plant.name}</h3>
            <p className="text-sm text-muted-foreground">{plant.scientificName}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => removeFromGarden(plant.id)}>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  )
}

