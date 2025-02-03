"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddReminderForm() {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement logic to add reminder
    console.log("Adding reminder:", { title, date, type })
    // Reset form
    setTitle("")
    setDate("")
    setType("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Reminder Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select onValueChange={setType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select reminder type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="water">Water</SelectItem>
            <SelectItem value="fertilize">Fertilize</SelectItem>
            <SelectItem value="prune">Prune</SelectItem>
            <SelectItem value="harvest">Harvest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Reminder</Button>
    </form>
  )
}

