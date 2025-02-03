"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl font-bold text-green-600 mb-6">About VERDANT</h1>
        
        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At VERDANT, we're passionate about connecting people with nature through technology. 
              Our mission is to make gardening accessible, enjoyable, and sustainable for everyone.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">What We Offer</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Plant identification technology</li>
                <li>• Personalized care recommendations</li>
                <li>• Community gardening resources</li>
                <li>• Expert gardening advice</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3">Our Values</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Environmental sustainability</li>
                <li>• Community engagement</li>
                <li>• Educational empowerment</li>
                <li>• Innovation in gardening</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Reyya Nitin",
                  role: "Founder & Lead Developer",
                  description: "Full-stack development expert"
                },
                {
                  name: "G.Shashank mouli",
                  role: "Technical Lead",
                  description: "System architecture specialist"
                },
                {
                  name: "K.Sahan",
                  role: "UI/UX Designer",
                  description: "User experience innovator"
                }
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-green-600">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 