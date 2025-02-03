"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ExpertTip, experts } from "@/components/expert-tip"

const topics = [
  {
    title: "Understanding Plant Basics",
    content: [
      "Learn about different plant types and their needs",
      "Understanding soil types and preparation",
      "Basic tools and equipment needed",
      "Watering fundamentals and techniques"
    ],
    expert: {
      tip: "Start with hardy plants like Snake Plants or ZZ Plants - they're forgiving and perfect for beginners.",
      expert: experts.keerthi
    }
  },
  {
    title: "Getting Started",
    content: [
      "Choosing your first plants",
      "Creating an ideal growing environment",
      "Basic plant care routine",
      "Common beginner mistakes to avoid"
    ],
    expert: {
      tip: "Always check the drainage holes in your pots - proper drainage is crucial for plant health.",
      expert: experts.harshita
    }
  },
  // ... more sections
]

export default function BeginnersGuidePage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose dark:prose-invert max-w-none"
      >
        <h1>Beginner's Guide to Gardening</h1>
        <p className="lead">
          Start your gardening journey with confidence using our comprehensive guide for beginners.
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