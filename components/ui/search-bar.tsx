"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Search, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGarden } from "@/context/garden-context"

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const router = useRouter()
  const { plants } = useGarden()

  const handleSelect = (currentValue: string) => {
    setOpen(false)
    const selectedPlant = plants.find(plant => plant.name === currentValue)
    if (selectedPlant) {
      router.push(selectedPlant.path)
    }
  }

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            role="combobox" 
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              {value ? value : "Search plants..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search plants..." />
            <CommandEmpty>No plant found.</CommandEmpty>
            <CommandGroup>
              {plants.map((plant) => (
                <CommandItem
                  key={plant.id}
                  value={plant.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    handleSelect(currentValue)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === plant.name ? "opacity-100" : "opacity-0"
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
  )
} 