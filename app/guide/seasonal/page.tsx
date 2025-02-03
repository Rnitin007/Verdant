"use client"

import { motion } from "framer-motion"
import { ExpertTip, experts } from "@/components/expert-tip"

const seasons = [
  {
    title: "Spring (March - May)",
    plants: [
      "Tomatoes",
      "Peppers",
      "Herbs",
      "Annual flowers"
    ],
    tasks: [
      "Prepare soil and beds",
      "Start seeds indoors",
      "Prune winter damage",
      "Begin regular watering schedule"
    ],
    expert: {
      tip: "Start your seeds indoors 6-8 weeks before the last frost date for a head start on the growing season.",
      expert: experts.sai
    }
  },
  {
    title: "Summer (June - August)",
    plants: [
      "Heat-loving vegetables",
      "Tropical plants",
      "Drought-resistant plants"
    ],
    tasks: [
      "Regular watering and feeding",
      "Pest monitoring",
      "Harvesting vegetables",
      "Deadheading flowers"
    ],
    expert: {
      tip: "Water deeply in the early morning to prevent evaporation and fungal growth.",
      expert: experts.rajesh
    }
  },
  // ... Add Autumn and Winter sections
]

export default function SeasonalGuidePage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose dark:prose-invert max-w-none"
      >
        <h1>Seasonal Planting Guide</h1>
        <p className="lead">
          Learn what to plant and maintain throughout the year for optimal growth.
        </p>
        
        {seasons.map((season, index) => (
          <motion.section
            key={season.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2>{season.title}</h2>
            <h3>What to Plant</h3>
            <ul>
              {season.plants.map((plant, i) => (
                <li key={i}>{plant}</li>
              ))}
            </ul>
            <h3>Maintenance Tasks</h3>
            <ul>
              {season.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
            <ExpertTip tip={season.expert.tip} expert={season.expert.expert} />
          </motion.section>
        ))}
      </motion.div>
    </div>
  )
} 