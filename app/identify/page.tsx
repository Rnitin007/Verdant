'use client'

import { motion } from "framer-motion"
import { PlantIdentifier } from "@/components/camera/PlantIdentifier"

export default function IdentifyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-green-600 mb-6">Identify Your Plant</h1>
        <p className="text-gray-600 mb-8">
          Take a photo or upload an image of your plant to identify its species and get care instructions.
        </p>
        
        <PlantIdentifier />
        
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Tips for better identification:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Ensure good lighting when taking photos</li>
            <li>Include both leaves and flowers if possible</li>
            <li>Take clear, focused shots of distinctive features</li>
            <li>Avoid blurry or dark images</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
} 