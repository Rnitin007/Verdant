"use client"

import { motion } from "framer-motion"
import { ExpertTip, experts } from "@/components/expert-tip"

const topics = [
  {
    title: "Common Garden Pests",
    content: [
      "Identifying common pest types",
      "Understanding pest behavior",
      "Early detection methods",
      "Prevention strategies"
    ],
    expert: {
      tip: "Regular inspection of leaf undersides can help catch pest problems early before they become severe.",
      expert: experts.lokesh
    }
  },
  {
    title: "Natural Pest Control",
    content: [
      "Companion planting",
      "Beneficial insects",
      "Organic pest deterrents",
      "Natural sprays and solutions"
    ],
    expert: {
      tip: "Neem oil is an excellent natural pesticide that's safe for most plants and beneficial insects.",
      expert: experts.chandini
    }
  }
]

export default function PestControlPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose dark:prose-invert max-w-none"
      >
        <h1>Natural Pest Control Guide</h1>
        <p className="lead">
          Learn effective and eco-friendly ways to protect your plants from pests.
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