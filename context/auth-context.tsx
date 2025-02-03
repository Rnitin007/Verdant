"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type User = {
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  signup: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // Mock authentication for demonstration purposes
  const login = async (username: string, password: string) => {
    // In a real app, you would validate credentials against your backend
    if (username === "demo@garden.com" && password === "password123") {
      setUser({ username: "Demo User", email: "demo@garden.com" })
      return true
    }
    return false
  }

  const signup = async (username: string, email: string, password: string) => {
    // In a real app, you would send this data to your backend to create a new user
    setUser({ username, email })
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

