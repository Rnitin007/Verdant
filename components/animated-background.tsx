'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const LeafPath = ({ side = "right", rotate = 0, scale = 1 }) => {
    // More natural leaf shape with a curve
    const path = side === "right" 
      ? "M0,0 C2,-3 8,-5 12,-2 C15,0 15,4 12,6 C8,8 2,6 0,0" 
      : "M0,0 C-2,-3 -8,-5 -12,-2 C-15,0 -15,4 -12,6 C-8,8 -2,6 0,0"
    
    return (
      <motion.path
        d={path}
        fill="currentColor"
        initial={{ scale: 0, rotate }}
        animate={{ scale, rotate }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,255,180,0.1),rgba(80,220,150,0.05))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/80 via-emerald-50/50 to-teal-50/30" />
      
      {/* Nature pattern overlay */}
      <div className="absolute inset-0 opacity-5 plant-pattern" />
      
      {/* Growing vines with more leaves */}
      <div className="absolute left-0 bottom-0 w-72">
        <motion.div
          className="origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 20, ease: "easeOut" }}
        >
          <svg viewBox="0 0 100 400" className="w-full opacity-30">
            {/* Main vine path with more curves */}
            <motion.path
              d="M50,400 C50,350 60,300 50,250 C40,200 60,150 50,100 C40,50 60,0 50,-50"
              stroke="#16a34a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 12, ease: "easeInOut" }}
            />
            
            {/* More leaves along the vine */}
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.g 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.4 }}
                className={i % 2 === 0 ? "text-green-500" : "text-emerald-400"}
                transform={`translate(50, ${380 - i * 15})`}
              >
                {/* Alternate between different leaf arrangements */}
                {i % 3 === 0 ? (
                  <>
                    {/* Triple leaf arrangement */}
                    <g transform="rotate(-45)">
                      <LeafPath side="left" rotate={-15} scale={0.8} />
                    </g>
                    <g transform="rotate(45)">
                      <LeafPath side="right" rotate={15} scale={0.8} />
                    </g>
                    <g transform="rotate(0)">
                      <LeafPath side="right" rotate={90} scale={0.6} />
                    </g>
                  </>
                ) : i % 3 === 1 ? (
                  <>
                    {/* Paired leaves */}
                    <g transform="rotate(-30)">
                      <LeafPath side="left" rotate={-10} />
                    </g>
                    <g transform="rotate(30)">
                      <LeafPath side="right" rotate={10} />
                    </g>
                  </>
                ) : (
                  <>
                    {/* Single leaf alternating sides */}
                    <g transform={`rotate(${i % 2 ? 40 : -40})`}>
                      <LeafPath side={i % 2 ? "right" : "left"} scale={1.2} />
                    </g>
                  </>
                )}
                
                {/* Small buds or leaf starts */}
                <motion.circle
                  r="1.5"
                  fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.4 + 0.2 }}
                />
              </motion.g>
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Mirror the enhanced vine on the right */}
      <div className="absolute right-0 bottom-0 w-72 scale-x-[-1]">
        <motion.div
          className="origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 20, ease: "easeOut", delay: 2 }}
        >
          <svg viewBox="0 0 100 400" className="w-full opacity-30">
            <motion.path
              d="M50,400 C50,350 30,300 50,250 C70,200 40,150 50,100 C60,50 30,0 50,-50"
              stroke="#16a34a"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 12, ease: "easeInOut" }}
            />
            
            {/* Leaves along the vine */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.g 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.8 + 2 }}
                className="text-green-500"
                transform={`translate(50, ${380 - i * 35})`}
              >
                <g transform="rotate(-45)">
                  <LeafPath side="left" rotate={-15} />
                </g>
                <g transform="rotate(45)">
                  <LeafPath side="right" rotate={15} />
                </g>
                <motion.circle
                  r="2"
                  fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.8 + 2.4 }}
                />
              </motion.g>
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Add subtle floating pollen particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`pollen-${i}`}
          className="absolute w-1 h-1 bg-yellow-200/30 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
} 