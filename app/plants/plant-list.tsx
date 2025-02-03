"use client"

import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGarden } from "@/context/garden-context"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

// Update the Plant interface to include new properties
interface Plant {
  id: number
  name: string
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

const plants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    category: "Indoor",
    description: "Known for its distinctive split leaves. Thrives in bright, indirect light.",
    careLevel: "Moderate",
    waterNeeds: "Weekly",
    sunlight: "Indirect bright light",
    height: "6-8 feet indoors",
    growthRate: "Fast in growing season",
    soil: "Well-draining, rich potting mix",
    temperature: "65-85°F (18-29°C)",
    humidity: "High (60-80%)",
    propagation: "Stem cuttings",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 2,
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    category: "Indoor",
    description: "Excellent air purifier, very tolerant of low light and irregular watering.",
    careLevel: "Easy",
    waterNeeds: "Low",
    sunlight: "Any light condition",
    height: "3-6 feet indoors",
    growthRate: "Slow",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "Low (30-40%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 3,
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    category: "Herbs",
    description: "Fragrant herb with purple blooms, perfect for gardens and containers.",
    careLevel: "Moderate",
    waterNeeds: "Moderate",
    sunlight: "Full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "50-70°F (10-21°C)",
    humidity: "High (60-80%)",
    propagation: "Cuttings",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 4,
    name: "Cherry Tomato",
    scientificName: "Solanum lycopersicum var. cerasiforme",
    category: "Vegetables",
    description: "Compact variety perfect for containers and small gardens.",
    careLevel: "Moderate",
    waterNeeds: "High",
    sunlight: "Full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Seed",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 5,
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    category: "Indoor",
    description: "Fast-growing vine with heart-shaped leaves. Excellent for beginners.",
    careLevel: "Easy",
    waterNeeds: "Moderate",
    sunlight: "Low to bright indirect",
    height: "1-3 feet indoors",
    growthRate: "Fast",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 6,
    name: "Mint",
    scientificName: "Mentha spicata",
    category: "Herbs",
    description: "Vigorous grower with refreshing fragrance. Great for containers.",
    careLevel: "Easy",
    waterNeeds: "High",
    sunlight: "Partial to full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Cuttings",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 7,
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    category: "Indoor",
    description: "Elegant white flowers and glossy leaves. Great air purifier.",
    careLevel: "Easy",
    waterNeeds: "Moderate",
    sunlight: "Low to bright indirect",
    height: "1-2 feet indoors",
    growthRate: "Slow",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 8,
    name: "Sweet Basil",
    scientificName: "Ocimum basilicum",
    category: "Herbs",
    description: "Essential culinary herb with aromatic leaves.",
    careLevel: "Easy",
    waterNeeds: "Moderate",
    sunlight: "Full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Seed",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 9,
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    category: "Indoor",
    description: "Fast-growing plant with arching leaves and baby plantlets.",
    careLevel: "Easy",
    waterNeeds: "Moderate",
    sunlight: "Bright indirect",
    height: "1-2 feet indoors",
    growthRate: "Fast",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 10,
    name: "Bell Pepper",
    scientificName: "Capsicum annuum",
    category: "Vegetables",
    description: "Colorful and nutritious, great for container gardening.",
    careLevel: "Moderate",
    waterNeeds: "Moderate",
    sunlight: "Full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Seed",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 11,
    name: "ZZ Plant",
    scientificName: "Zamioculcas zamiifolia",
    category: "Indoor",
    description: "Nearly indestructible plant with glossy leaves.",
    careLevel: "Easy",
    waterNeeds: "Low",
    sunlight: "Any light condition",
    height: "1-2 feet indoors",
    growthRate: "Slow",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 12,
    name: "Rosemary",
    scientificName: "Rosmarinus officinalis",
    category: "Herbs",
    description: "Fragrant Mediterranean herb, excellent for cooking.",
    careLevel: "Moderate",
    waterNeeds: "Low",
    sunlight: "Full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "50-70°F (10-21°C)",
    humidity: "Low (30-40%)",
    propagation: "Cuttings",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 13,
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    category: "Indoor",
    description: "Popular houseplant with large, violin-shaped leaves.",
    careLevel: "Challenging",
    waterNeeds: "Moderate",
    sunlight: "Bright indirect",
    height: "2-4 feet indoors",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 14,
    name: "Thyme",
    scientificName: "Thymus vulgaris",
    category: "Herbs",
    description: "Low-growing herb perfect for ground cover or containers.",
    careLevel: "Easy",
    waterNeeds: "Low",
    sunlight: "Full sun",
    height: "1-2 feet",
    growthRate: "Slow",
    soil: "Well-draining, rich potting mix",
    temperature: "50-70°F (10-21°C)",
    humidity: "Low (30-40%)",
    propagation: "Cuttings",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 15,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    category: "Succulents",
    description: "Medicinal plant with thick, gel-filled leaves.",
    careLevel: "Easy",
    waterNeeds: "Low",
    sunlight: "Bright indirect to full sun",
    height: "2-3 feet indoors",
    growthRate: "Slow",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 16,
    name: "Cilantro",
    scientificName: "Coriandrum sativum",
    category: "Herbs",
    description: "Fast-growing herb used in many cuisines.",
    careLevel: "Moderate",
    waterNeeds: "Moderate",
    sunlight: "Partial to full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Seed",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 17,
    name: "String of Pearls",
    scientificName: "Senecio rowleyanus",
    category: "Succulents",
    description: "Trailing succulent with bead-like leaves.",
    careLevel: "Moderate",
    waterNeeds: "Low",
    sunlight: "Bright indirect",
    height: "1-2 feet indoors",
    growthRate: "Slow",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 18,
    name: "Cucumber",
    scientificName: "Cucumis sativus",
    category: "Vegetables",
    description: "Fast-growing vine, great for vertical gardening.",
    careLevel: "Moderate",
    waterNeeds: "High",
    sunlight: "Full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Seed",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  },
  {
    id: 19,
    name: "Chinese Evergreen",
    scientificName: "Aglaonema commutatum",
    category: "Indoor",
    description: "Tolerant plant with beautiful variegated leaves.",
    careLevel: "Easy",
    waterNeeds: "Moderate",
    sunlight: "Low to bright indirect",
    height: "1-2 feet indoors",
    growthRate: "Slow",
    soil: "Well-draining, rich potting mix",
    temperature: "60-80°F (15-27°C)",
    humidity: "High (60-80%)",
    propagation: "Leaves",
    flowering: "Rarely flowers indoors",
    maintenance: "Low"
  },
  {
    id: 20,
    name: "Oregano",
    scientificName: "Origanum vulgare",
    category: "Herbs",
    description: "Hardy Mediterranean herb, essential for Italian cooking.",
    careLevel: "Easy",
    waterNeeds: "Low",
    sunlight: "Full sun",
    height: "1-2 feet",
    growthRate: "Moderate",
    soil: "Well-draining, rich potting mix",
    temperature: "50-70°F (10-21°C)",
    humidity: "Low (30-40%)",
    propagation: "Cuttings",
    flowering: "Rarely flowers indoors",
    maintenance: "Regular pruning needed"
  }
]

export function PlantList() {
  const { addToGarden, userGarden } = useGarden()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const { user, isLoaded } = useUser()

  // Get unique categories from plants
  const categories = ["All", ...new Set(plants.map(plant => plant.category))]

  // Filter plants based on search query and category
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "All" || plant.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleAddToGarden = (plant: Plant) => {
    if (!isLoaded) return
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add plants to your garden",
        action: (
          <SignInButton mode="modal">
            <Button variant="default" size="sm">
              Login
            </Button>
          </SignInButton>
        ),
      })
      return
    }
    
    addToGarden(plant)
  }

  return (
    <div className="space-y-6">
      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Found {filteredPlants.length} plants
      </div>

      {/* Plants grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlants.map((plant, index) => (
          <motion.div
            key={plant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full dark:bg-gray-800/50 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header section */}
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold dark:text-gray-100">{plant.name}</h3>
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded",
                        {
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300': plant.category === 'Indoor',
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300': plant.category === 'Herbs',
                          'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300': plant.category === 'Vegetables',
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300': plant.category === 'Succulents',
                        }
                      )}>
                        {plant.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">{plant.scientificName}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300">{plant.description}</p>

                  {/* Basic Care Indicators */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                      Care: {plant.careLevel}
                    </span>
                    <span className="text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">
                      Water: {plant.waterNeeds}
                    </span>
                    <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">
                      Light: {plant.sunlight}
                    </span>
                  </div>

                  {/* Add to Garden Button */}
                  <Button 
                    onClick={() => handleAddToGarden(plant)}
                    disabled={!user || userGarden.some((p) => p.id === plant.id)}
                    className="w-full"
                    variant={userGarden.some((p) => p.id === plant.id) ? "outline" : "default"}
                  >
                    {userGarden.some((p) => p.id === plant.id) 
                      ? "View in My Garden" 
                      : user 
                        ? "Add to My Garden" 
                        : "Login to Add"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* No results message */}
        {filteredPlants.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-gray-500">No plants found matching your search criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

