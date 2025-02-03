"use client"

import { motion } from "framer-motion"
import { ExpertTip, experts } from "@/components/expert-tip"

const topics = [
  {
    title: "Sustainable Practices",
    content: [
      "Water conservation methods",
      "Composting basics",
      "Natural fertilizers",
      "Reducing garden waste"
    ],
    expert: {
      tip: "Create your own compost using kitchen scraps and yard waste - it's free and great for your plants!",
      expert: experts.dinesh
    }
  },
  {
    title: "Eco-Friendly Gardening",
    content: [
      "Native plant selection",
      "Wildlife-friendly gardening",
      "Water-wise landscaping",
      "Chemical-free pest control"
    ],
    expert: {
      tip: "Native plants require less water and maintenance while supporting local wildlife.",
      expert: experts.deepika
    }
  }
]

export default function SustainableGardeningPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose dark:prose-invert max-w-none"
      >
        <h1>Sustainable Gardening Guide</h1>
        <p className="lead">
          Learn how to create and maintain an environmentally friendly garden.
        </p>
        
        {topics.map((topic, index) => (
          <motion.section
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2>{topic.title}</h2>
            <ul>
              {topic.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <ExpertTip tip={topic.expert.tip} expert={topic.expert.expert} />
          </motion.section>
        ))}
      </motion.div>
    </div>
  )
} 