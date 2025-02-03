"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sprout, Calendar, Shield, Leaf } from "lucide-react"

const guides = [
  {
    title: "Beginner's Guide",
    href: "/guide/beginners",
    icon: Sprout,
    description: "Start your gardening journey with essential basics"
  },
  {
    title: "Seasonal Planting",
    href: "/guide/seasonal",
    icon: Calendar,
    description: "Learn what to plant throughout the year"
  },
  {
    title: "Pest Control",
    href: "/guide/pest-control",
    icon: Shield,
    description: "Natural ways to protect your plants"
  },
  {
    title: "Sustainable Gardening",
    href: "/guide/sustainable",
    icon: Leaf,
    description: "Eco-friendly gardening practices"
  }
]

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-[250px_1fr] gap-8">
        <aside className="lg:border-r pr-8 space-y-4 h-fit">
          <nav className="space-y-2 sticky top-24">
            {guides.map((guide) => {
              const Icon = guide.icon
              return (
                <Link key={guide.href} href={guide.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2",
                      pathname === guide.href && "bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {guide.title}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </aside>
        <main className="min-h-[calc(100vh-12rem)]">{children}</main>
      </div>
    </div>
  )
} 