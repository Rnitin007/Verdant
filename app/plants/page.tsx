"use client"

import { motion } from "framer-motion"
import { PlantList } from "./plant-list"

export default function PlantsPage() {
  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-green-600 mb-6">Plant Database</h1>
        <p className="text-gray-600 mb-8">
          Explore our collection of plants and add them to your garden.
        </p>
        
        <PlantList />
      </motion.div>
    </div>
  )
}

