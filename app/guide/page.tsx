"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, Calendar, Shield, Leaf } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const guides = [
  {
    title: "Beginner's Guide",
    href: "/guide/beginners",
    icon: Sprout,
    description: "Start your gardening journey with essential basics",
    color: "text-green-500"
  },
  {
    title: "Seasonal Planting",
    href: "/guide/seasonal",
    icon: Calendar,
    description: "Learn what to plant throughout the year",
    color: "text-orange-500"
  },
  {
    title: "Pest Control",
    href: "/guide/pest-control",
    icon: Shield,
    description: "Natural ways to protect your plants",
    color: "text-red-500"
  },
  {
    title: "Sustainable Gardening",
    href: "/guide/sustainable",
    icon: Leaf,
    description: "Eco-friendly gardening practices",
    color: "text-emerald-500"
  }
]

export default function GuidePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Gardening Guide
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive resources to help you grow successfully
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {guides.map((guide, index) => {
            const Icon = guide.icon
            return (
              <motion.div
                key={guide.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={guide.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className={cn("h-5 w-5", guide.color)} />
                        {guide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        {guide.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 