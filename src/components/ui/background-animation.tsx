"use client"

import { motion } from "framer-motion"

export function BackgroundAnimation() {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-200/30 rounded-full"
      initial={false} // Skip initial animation
      animate={{
        x: `${Math.random() * 100}vw`, // Use viewport units instead
        y: `${Math.random() * 100}vh`,
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  )
} 