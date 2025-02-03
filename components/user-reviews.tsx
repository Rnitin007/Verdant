"use client"

import { motion } from "framer-motion"

const reviews = [
  {
    id: 1,
    name: "Alice W.",
    rating: 5,
    text: "Garden Companion has transformed my gardening experience! The plant database is extensive and the reminders are so helpful.",
  },
  {
    id: 2,
    name: "Bob M.",
    rating: 4,
    text: "Great app for both beginners and experienced gardeners. The community feature is fantastic for getting advice.",
  },
  {
    id: 3,
    name: "Carol S.",
    rating: 5,
    text: "I love how easy it is to track my plants' progress. The interface is intuitive and visually appealing.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function UserReviews() {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {reviews.map((review) => (
        <motion.div
          key={review.id}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
        >
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{review.name}</h3>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-gray-600">{review.text}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

