"use client"

import { motion } from "framer-motion"

interface ExpertTipProps {
  tip: string
  expert: {
    name: string
    role: string
  }
}

const experts = {
  keerthi: {
    name: "Keerthi",
    role: "Urban Gardening Specialist"
  },
  akash: {
    name: "Akash",
    role: "Plant Pathologist"
  },
  sai: {
    name: "Sai",
    role: "Hydroponics Expert"
  },
  rajesh: {
    name: "Rajesh",
    role: "Landscape Designer"
  },
  dinesh: {
    name: "Dinesh",
    role: "Organic Farming Consultant"
  },
  chandini: {
    name: "Chandini",
    role: "Indoor Plant Specialist"
  },
  lokesh: {
    name: "Lokesh",
    role: "Sustainable Gardening Expert"
  },
  deepika: {
    name: "Deepika",
    role: "Botanical Researcher"
  },
  adi: {
    name: "Adi",
    role: "Plant Care Specialist"
  },
  harshita: {
    name: "Harshita",
    role: "Garden Design Consultant"
  }
}

export function ExpertTip({ tip, expert }: ExpertTipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 my-6"
    >
      <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">
        Tip from the Pros
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{tip}</p>
      <p className="text-sm text-green-600 dark:text-green-400">
        {expert.name}, {expert.role}
      </p>
    </motion.div>
  )
}

export { experts } 