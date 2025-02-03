"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useGarden } from "@/context/garden-context"

const defaultTips = {
  watering: "Water when top soil is dry",
  sunlight: "Place in appropriate lighting",
  fertilizing: "Feed during growing season",
  pruning: "Remove dead or yellowing leaves"
}

const plantTips: Record<string, typeof defaultTips> = {
  "Monstera Deliciosa": {
    watering: "Water every 1-2 weeks",
    sunlight: "Bright indirect light",
    fertilizing: "Monthly during growing season",
    pruning: "Remove yellowing leaves and trim aerial roots"
  },
  "Snake Plant": {
    watering: "Water every 2-3 weeks",
    sunlight: "Any light condition",
    fertilizing: "Every 2-3 months",
    pruning: "Remove damaged leaves at base"
  }
}

export default function GardenPage() {
  const { userGarden, removeFromGarden } = useGarden()

  const getTips = (plantName: string) => {
    return plantTips[plantName] || defaultTips
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">My Garden</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your plants and get personalized care tips.
          </p>
        </div>

        {userGarden.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Your garden is empty. Add some plants to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {userGarden.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">{plant.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {plant.scientificName}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(getTips(plant.name)).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <h3 className="font-medium capitalize">{key}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => removeFromGarden(plant.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

