"use client"

import { motion } from "framer-motion"
import { WeatherDashboard } from "./weather-dashboard"
import { CommunitySection } from "./community-section"

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Garden Community</h1>
          <p className="text-gray-600">Connect with local gardeners and check growing conditions.</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Local Weather</h2>
            <WeatherDashboard />
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Garden Communities</h2>
            <CommunitySection />
          </section>
        </div>
      </motion.div>
    </div>
  )
} 