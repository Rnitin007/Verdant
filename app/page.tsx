"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GardeningTips } from "@/components/gardening-tips"
import { UserReviews } from "@/components/user-reviews"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <>
      <AnimatedBackground />
      <main className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start py-8 px-4">
        <motion.div
          className="text-center bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-xl w-full max-w-6xl mx-auto border border-green-100"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-600" variants={itemVariants}>
            Welcome to VERDANT
          </motion.h1>
          <motion.p className="text-lg md:text-xl mb-6 text-gray-600" variants={itemVariants}>
            Your Premium Plant Care Companion
          </motion.p>
          <motion.div className="flex gap-3 justify-center mb-8" variants={itemVariants}>
            <Link href="/plants">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-base md:text-lg">
                Explore Plants
              </button>
            </Link>
            <Link href="/garden">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg text-base md:text-lg">
                My Garden
              </button>
            </Link>
          </motion.div>

          <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8" variants={containerVariants}>
            {[
              { title: "Plant Database", value: "45,000+", description: "Premium species" },
              { title: "Smart Care", value: "AI-Powered", description: "Plant monitoring" },
              { title: "Expert Community", value: "10,000+", description: "Plant enthusiasts" },
              { title: "Plant Recognition", value: "Instant", description: "Visual identification" },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-3xl font-bold text-green-600 mb-1">{item.value}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-green-600">Expert Plant Care Tips</h2>
            <GardeningTips />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-green-600">VERDANT Community Reviews</h2>
            <UserReviews />
          </motion.div>
        </motion.div>

        {/* Add decorative plants */}
        <motion.div
          className="fixed top-10 right-10 w-32 opacity-40"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src="/decorative-plant.svg" alt="" className="w-full" />
        </motion.div>

        <motion.div
          className="fixed bottom-10 left-10 w-40 opacity-40"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src="/decorative-plant.svg" alt="" className="w-full transform scale-x-[-1]" />
        </motion.div>
      </main>
    </>
  )
}

