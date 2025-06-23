"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin, Clock, Mountain, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock trails data - in real app, this would come from API
const availableTrails = [
  {
    id: 1,
    name: "Eagle Peak Trail",
    location: "Rocky Mountains National Park",
    distance: "7.2 km",
    elevation: "580 m",
    duration: "3-4 hours",
    difficulty: "Moderate",
  },
  {
    id: 2,
    name: "Blue Lake Loop",
    location: "Alpine Valley Wilderness",
    distance: "5.6 km",
    elevation: "210 m",
    duration: "2-3 hours",
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Misty Canyon Traverse",
    location: "Cascade Mountains",
    distance: "12.8 km",
    elevation: "950 m",
    duration: "6-7 hours",
    difficulty: "Difficult",
  },
]

export function CreateGroupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTrail, setSelectedTrail] = useState(null)
  const [date, setDate] = useState()
  const [requirements, setRequirements] = useState([])
  const [newRequirement, setNewRequirement] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    maxSize: 6,
    meetingPoint: "",
    meetingCoordinates: {
      latitude: "",
      longitude: "",
    },
  })

  const handleInputChange = () => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTrailSelect = (trailId) => {
    const trail = availableTrails.find((t) => t.id === Number.parseInt(trailId))
    setSelectedTrail(trail)
  }

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (requirement) => {
    setRequirements(requirements.filter((r) => r !== requirement))
  }

  const handleSubmit = async () => {
    e.preventDefault()

    if (!selectedTrail || !date) {
      alert("Please select a trail and date")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/groups")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Tell us about your hiking group</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Group Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Sunrise Hike at Eagle Peak"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your hiking group, what to expect, and any special details..."
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxSize">Maximum Group Size</Label>
              <Select
                value={formData.maxSize.toString()}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, maxSize: Number.parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} people
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Hike Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trail Selection</CardTitle>
          <CardDescription>Choose the trail for your hiking group</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Trail</Label>
            <Select onValueChange={handleTrailSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a trail" />
              </SelectTrigger>
              <SelectContent>
                {availableTrails.map((trail) => (
                  <SelectItem key={trail.id} value={trail.id.toString()}>
                    {trail.name} - {trail.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTrail && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">{selectedTrail.name}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <span>{selectedTrail.distance}</span>
                </div>
                <div className="flex items-center">
                  <Mountain className="h-4 w-4 text-primary mr-1" />
                  <span>{selectedTrail.elevation}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-primary mr-1" />
                  <span>{selectedTrail.duration}</span>
                </div>
                <div>
                  <Badge
                    variant={
                      selectedTrail.difficulty === "Easy"
                        ? "default"
                        : selectedTrail.difficulty === "Moderate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {selectedTrail.difficulty}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{selectedTrail.location}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Details</CardTitle>
          <CardDescription>Where will the group meet before the hike?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meetingPoint">Meeting Point Description</Label>
            <Input
              id="meetingPoint"
              name="meetingPoint"
              placeholder="e.g., Trailhead parking lot, Visitor center entrance"
              value={formData.meetingPoint}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude (Optional)</Label>
              <Input
                id="latitude"
                name="latitude"
                placeholder="e.g., 40.7128"
                value={formData.meetingCoordinates.latitude}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    meetingCoordinates: { ...prev.meetingCoordinates, latitude: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude (Optional)</Label>
              <Input
                id="longitude"
                name="longitude"
                placeholder="e.g., -74.0060"
                value={formData.meetingCoordinates.longitude}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    meetingCoordinates: { ...prev.meetingCoordinates, longitude: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requirements & Recommendations</CardTitle>
          <CardDescription>Add any specific requirements or recommendations for participants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Bring hiking boots, Water bottle required"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
            />
            <Button type="button" onClick={addRequirement} size="icon" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {requirements.length > 0 && (
            <div className="space-y-2">
              <Label>Requirements</Label>
              <div className="flex flex-wrap gap-2">
                {requirements.map((requirement, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {requirement}
                    <button
                      type="button"
                      onClick={() => removeRequirement(requirement)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Creating Group..." : "Create Group"}
        </Button>
      </div>
    </form>
  )
}
