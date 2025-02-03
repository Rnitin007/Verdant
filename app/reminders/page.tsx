"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion } from "framer-motion"
import { Bell, Calendar, Clock, Trash2, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { useGarden } from "@/context/garden-context"
import { cn } from "@/lib/utils"

interface Reminder {
  id: number
  plantName: string
  type: string
  date: string
  time: string
  recurring: boolean
}

const reminderTypes = [
  "Water",
  "Fertilize",
  "Prune",
  "Repot",
  "Mist",
  "Check Soil",
  "Rotate",
  "Clean Leaves"
]

export default function RemindersPage() {
  const { user, isLoaded } = useUser()
  const { userGarden } = useGarden()
  const [open, setOpen] = useState(false)
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      plantName: "Monstera Deliciosa",
      type: "Water",
      date: "2024-03-20",
      time: "09:00",
      recurring: true
    }
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)
  const [newReminder, setNewReminder] = useState<Omit<Reminder, "id">>({
    plantName: "",
    type: "Water",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "09:00",
    recurring: false
  })

  const handleCreateReminder = () => {
    const reminder = {
      id: Date.now(),
      ...newReminder
    }
    setReminders([...reminders, reminder])
    resetForm()
    setIsDialogOpen(false)
  }

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder)
    setNewReminder({
      plantName: reminder.plantName,
      type: reminder.type,
      date: reminder.date,
      time: reminder.time,
      recurring: reminder.recurring
    })
    setIsDialogOpen(true)
  }

  const handleUpdateReminder = () => {
    if (!editingReminder) return
    
    setReminders(reminders.map(reminder => 
      reminder.id === editingReminder.id 
        ? { ...reminder, ...newReminder }
        : reminder
    ))
    resetForm()
    setIsDialogOpen(false)
  }

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  const resetForm = () => {
    setNewReminder({
      plantName: "",
      type: "Water",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "09:00",
      recurring: false
    })
    setEditingReminder(null)
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Reminders
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please sign in to manage your plant care reminders
            </p>
            <SignInButton mode="modal">
              <Button className="w-full">
                Login to Set Reminders
              </Button>
            </SignInButton>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Plant Care Reminders
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Bell className="mr-2 h-4 w-4" />
                New Reminder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingReminder ? "Edit Reminder" : "Create New Reminder"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="plantName">Plant Name</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {newReminder.plantName
                          ? userGarden.find((plant) => plant.name === newReminder.plantName)?.name
                          : "Select plant..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search plants..." />
                        <CommandEmpty>No plant found.</CommandEmpty>
                        <CommandGroup>
                          {userGarden.map((plant) => (
                            <CommandItem
                              key={plant.id}
                              value={plant.name}
                              onSelect={(currentValue) => {
                                setNewReminder({ 
                                  ...newReminder, 
                                  plantName: currentValue === newReminder.plantName ? "" : currentValue 
                                })
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  newReminder.plantName === plant.name ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {plant.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Reminder Type</Label>
                  <Select
                    value={newReminder.type}
                    onValueChange={(value) => setNewReminder({ ...newReminder, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reminderTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="recurring">Recurring Reminder</Label>
                  <Switch
                    id="recurring"
                    checked={newReminder.recurring}
                    onCheckedChange={(checked) => setNewReminder({ ...newReminder, recurring: checked })}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={editingReminder ? handleUpdateReminder : handleCreateReminder}
                  disabled={!newReminder.plantName}
                >
                  {editingReminder ? "Update Reminder" : "Create Reminder"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {reminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {reminder.plantName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {reminder.type} {reminder.recurring && "• Recurring"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {reminder.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {reminder.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditReminder(reminder)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteReminder(reminder.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {reminders.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No reminders set. Create one to get started!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

