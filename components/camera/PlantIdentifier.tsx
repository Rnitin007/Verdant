'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, X } from "lucide-react"
import { toast } from "sonner"
import Webcam from "react-webcam"

export function PlantIdentifier() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const webcamRef = useRef<Webcam>(null)

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setImagePreview(imageSrc)
      setShowCamera(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const identifyPlant = async () => {
    if (!imagePreview) return

    setIsLoading(true)
    try {
      // Here you would integrate with a plant identification API
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Plant identification feature coming soon!')
    } catch (error) {
      toast.error('Failed to identify plant. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          {showCamera ? (
            <div className="relative">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />
              <div className="flex justify-center gap-2 mt-2">
                <Button onClick={handleCapture}>
                  <Camera className="mr-2" />
                  Capture Photo
                </Button>
                <Button variant="outline" onClick={() => setShowCamera(false)}>
                  <X className="mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Button onClick={() => setShowCamera(true)}>
                <Camera className="mr-2" />
                Take Photo
              </Button>
              <div className="text-center">
                <span className="text-sm text-muted-foreground">or</span>
              </div>
              <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                Upload Photo
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          )}

          {imagePreview && !showCamera && (
            <div className="space-y-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={imagePreview}
                  alt="Plant preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <Button 
                className="w-full" 
                onClick={identifyPlant}
                disabled={isLoading}
              >
                {isLoading ? 'Identifying...' : 'Identify Plant'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 