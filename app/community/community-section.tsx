"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Calendar, Loader2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface Community {
  id: number
  name: string
  location: string
  members: number
  nextMeeting: string
  description: string
}

const communities = [
  {
    id: 1,
    name: "Urban Gardeners Club",
    location: "Downtown Community Center",
    members: 128,
    nextMeeting: "Every Saturday, 10 AM",
    description: "A community of urban gardening enthusiasts sharing tips and experiences."
  },
  {
    id: 2,
    name: "Organic Growers Network",
    location: "Green Valley Park",
    members: 95,
    nextMeeting: "First Sunday of each month",
    description: "Focus on organic gardening methods and sustainable practices."
  },
  {
    id: 3,
    name: "Herb Garden Enthusiasts",
    location: "Botanical Gardens",
    members: 76,
    nextMeeting: "Wednesday evenings",
    description: "Dedicated to growing and using culinary and medicinal herbs."
  },
  {
    id: 4,
    name: "Community Garden Project",
    location: "Riverside Gardens",
    members: 156,
    nextMeeting: "Bi-weekly Saturdays",
    description: "Working together to maintain and grow our community garden."
  }
]

export function CommunitySection() {
  const [joiningStates, setJoiningStates] = useState<Record<number, string>>({})
  const { toast } = useToast()

  const handleJoin = async (community: Community) => {
    // Set loading state
    setJoiningStates(prev => ({ ...prev, [community.id]: 'loading' }))

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Update to waitlist state
    setJoiningStates(prev => ({ ...prev, [community.id]: 'waitlist' }))
    
    // Show toast notification
    toast({
      title: "Added to waitlist!",
      description: `You've been added to the waitlist for ${community.name}. We'll notify you when a spot opens up.`,
      duration: 5000,
    })
  }

  const getButtonContent = (communityId: number) => {
    const state = joiningStates[communityId]
    
    switch (state) {
      case 'loading':
        return (
          <span className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Joining...
          </span>
        )
      case 'waitlist':
        return (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-yellow-600"
          >
            On Waitlist
          </motion.span>
        )
      default:
        return "Join Community"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {communities.map((community) => (
        <motion.div
          key={community.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
              <p className="text-gray-600 mb-4">{community.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{community.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{community.members} members</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{community.nextMeeting}</span>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => handleJoin(community)}
                disabled={joiningStates[community.id] === 'loading' || joiningStates[community.id] === 'waitlist'}
                variant={joiningStates[community.id] === 'waitlist' ? "outline" : "default"}
              >
                {getButtonContent(community.id)}
              </Button>

              {joiningStates[community.id] === 'waitlist' && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-yellow-600 mt-2 text-center"
                >
                  You're #{Math.floor(Math.random() * 10) + 1} on the waitlist
                </motion.p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
} 