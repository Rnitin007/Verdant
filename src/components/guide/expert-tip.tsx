"use client"

import { motion } from "framer-motion"
import { Expert } from "@/types"

interface ExpertTipProps {
  tip: string
  expert: Expert
}

export const experts = {
  keerthi: {
    name: "Keerthi",
    role: "Urban Gardening Specialist"
  },
  // ... other experts
} as const

export function ExpertTip({ tip, expert }: ExpertTipProps) {
  // ... component implementation
} 