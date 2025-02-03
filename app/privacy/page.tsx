"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl font-bold text-green-600 mb-6">Privacy Policy</h1>
        
        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
              <p className="text-gray-600">
                We collect information that you provide directly to us, including your name, email address, 
                and garden preferences. We also collect data about your plant care activities and community interactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide personalized plant care recommendations</li>
                <li>To improve our plant identification technology</li>
                <li>To connect you with other gardening enthusiasts</li>
                <li>To send important updates about your garden</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information. 
                Your data is encrypted and stored securely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about our privacy policy, please contact us at privacy@verdant.com
              </p>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 