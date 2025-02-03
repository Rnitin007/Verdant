"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

// Mock data for demonstration
const mockReminders = [
  { id: 1, title: "Water tomatoes", date: "2023-06-15", type: "water" },
  { id: 2, title: "Fertilize roses", date: "2023-06-18", type: "fertilize" },
  { id: 3, title: "Prune apple tree", date: "2023-06-20", type: "prune" },
]

export function ReminderList() {
  const [reminders, setReminders] = useState(mockReminders)

  const completeReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  return (
    <ul className="space-y-2">
      {reminders.map((reminder) => (
        <li key={reminder.id} className="flex justify-between items-center p-2 bg-secondary rounded">
          <div>
            <h3 className="font-medium">{reminder.title}</h3>
            <p className="text-sm text-muted-foreground">
              {reminder.date} - {reminder.type}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => completeReminder(reminder.id)}>
            Complete
          </Button>
        </li>
      ))}
    </ul>
  )
}

