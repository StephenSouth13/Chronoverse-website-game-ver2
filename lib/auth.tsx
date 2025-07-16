"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextType {
  user: { username: string } | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null)

  const login = (username: string) => {
    // In a real app, this would involve setting a session/token
    setUser({ username })
  }

  const logout = () => {
    // In a real app, this would involve clearing session/token
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
