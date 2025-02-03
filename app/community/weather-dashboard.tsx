"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Sun, Cloud, Droplets, Wind, Thermometer } from "lucide-react"

interface WeatherData {
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  sys: {
    sunrise: number
    sunset: number
  }
  name: string
}

export function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          )
          const data = await response.json()
          setWeather(data)
        } catch (err) {
          setError("Failed to fetch weather data")
        } finally {
          setLoading(false)
        }
      }, () => {
        setError("Please enable location services to see weather information")
        setLoading(false)
      })
    }
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!weather) return null

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="text-gray-600 mt-1">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              <div className="text-right">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-16 h-16"
                />
                <p className="text-gray-700 capitalize">{weather.weather[0].description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Pressure</p>
                  <p className="font-medium">{weather.main.pressure} hPa</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-medium">{weather.main.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Wind Speed</p>
                  <p className="font-medium">{weather.wind.speed} m/s</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Sun</p>
                  <p className="font-medium">
                    ↑ {formatTime(weather.sys.sunrise)}
                    <br />
                    ↓ {formatTime(weather.sys.sunset)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 