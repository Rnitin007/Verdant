import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { BackgroundVideo } from "@/components/background-video"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { GardenProvider } from "@/context/garden-context"
import { BackgroundAnimation } from "@/components/ui/background-animation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VERDANT - Premium Plant Care Companion",
  description: "Experience the future of plant care with VERDANT. Identify, monitor, and nurture your plants with expert precision.",
  keywords: ["plant care", "plant identification", "garden management", "smart gardening", "VERDANT"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans antialiased ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GardenProvider>
              <BackgroundVideo />
              <MainNav />
              <main className="flex-grow">{children}</main>
              <Footer />
              <Toaster />
              {/* Add multiple instances for a better effect */}
              {Array.from({ length: 20 }).map((_, i) => (
                <BackgroundAnimation key={i} />
              ))}
            </GardenProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}



import './globals.css'