"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Search, Bell, Sun, Moon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchBar } from "@/components/ui/search-bar"

export function MainNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Time to water Monstera",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "Snake Plant needs attention",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      title: "Fertilizer reminder",
      time: "1 day ago",
      read: false
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-500">
              Garden Companion
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/plants" 
                className={cn(
                  "text-base font-medium transition-colors hover:text-green-600 dark:hover:text-green-500",
                  pathname === "/plants" 
                    ? "text-green-600 dark:text-green-500" 
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                Plants
              </Link>
              <Link 
                href="/identify" 
                className={cn(
                  "text-base font-medium transition-colors hover:text-green-600 dark:hover:text-green-500",
                  pathname === "/identify" 
                    ? "text-green-600 dark:text-green-500" 
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                Identify
              </Link>
              <Link 
                href="/reminders" 
                className={cn(
                  "text-base font-medium transition-colors hover:text-green-600 dark:hover:text-green-500",
                  pathname === "/reminders" 
                    ? "text-green-600 dark:text-green-500" 
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                Reminders
              </Link>
              <Link 
                href="/guide" 
                className={cn(
                  "text-base font-medium transition-colors hover:text-green-600 dark:hover:text-green-500",
                  pathname === "/guide" 
                    ? "text-green-600 dark:text-green-500" 
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                Guide
              </Link>
              <Link 
                href="/community" 
                className={cn(
                  "text-base font-medium transition-colors hover:text-green-600 dark:hover:text-green-500",
                  pathname === "/community" 
                    ? "text-green-600 dark:text-green-500" 
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                Community
              </Link>
              <SignedIn>
                <Link 
                  href="/garden" 
                  className={cn(
                    "text-base font-medium transition-colors hover:text-green-600 dark:hover:text-green-500",
                    pathname === "/garden" 
                      ? "text-green-600 dark:text-green-500" 
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  My Garden
                </Link>
              </SignedIn>
            </nav>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden lg:flex items-center gap-4">
            <SearchBar />
            <div className="flex items-center gap-2">
              <SignedIn>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 text-[10px] font-medium text-white flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllAsRead}
                          className="text-xs"
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <DropdownMenuItem
                            key={notification.id}
                            className={cn(
                              "flex flex-col items-start px-4 py-2 cursor-pointer",
                              !notification.read && "bg-green-50 dark:bg-green-900/10"
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <p className={cn(
                              "text-sm",
                              !notification.read && "font-medium"
                            )}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SignedIn>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="font-medium">
                  Login / Sign Up
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  )
}

