"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const tips = [
  {
    id: 1,
    text: "Water deeply and less frequently to encourage deep root growth.",
    author: "Emma Green, Horticulturist",
  },
  {
    id: 2,
    text: "Mulch your garden to conserve water and suppress weeds.",
    author: "Michael Brown, Landscape Designer",
  },
  {
    id: 3,
    text: "Rotate your crops to prevent soil depletion and control pests.",
    author: "Sarah Johnson, Agricultural Scientist",
  },
  {
    id: 4,
    text: "Companion planting can help deter pests and improve plant health.",
    author: "David Lee, Organic Farmer",
  },
  {
    id: 5,
    text: "Prune plants regularly to promote healthy growth and air circulation.",
    author: "Lisa Chen, Botanist",
  },
]

export function GardeningTips() {
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prevTip) => (prevTip + 1) % tips.length)
    }, 5000) // Change tip every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-green-100 rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-green-800">Tip from the Pros</h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <p className="text-gray-700 mb-2">{tips[currentTip].text}</p>
            <p className="text-sm text-green-600">{tips[currentTip].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

