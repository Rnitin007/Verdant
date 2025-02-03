"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl font-bold text-green-600 mb-6">Terms of Service</h1>
        
        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-6 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using VERDANT, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. User Responsibilities</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide accurate information when creating an account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in a lawful and respectful manner</li>
                <li>Respect the intellectual property rights of others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Service Usage</h2>
              <p className="text-gray-600">
                VERDANT provides plant care information and community features. While we strive for accuracy, 
                we cannot guarantee the completeness or reliability of all information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Community Guidelines</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Be respectful to other community members</li>
                <li>Share accurate and helpful information</li>
                <li>Do not spam or promote unauthorized content</li>
                <li>Report inappropriate behavior</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Continued use of VERDANT 
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact</h2>
              <p className="text-gray-600">
                For questions about these terms, please contact legal@verdant.com
              </p>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 