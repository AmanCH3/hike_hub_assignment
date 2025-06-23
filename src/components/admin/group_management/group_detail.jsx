"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CalendarDays,
  MapPin,
  Clock,
  Mountain,
  Navigation,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Share2,
  Edit,
  Trash2,
} from "lucide-react"

// Mock group data - in real app, this would come from API
const mockGroup = {
  id: 1,
  title: "Sunrise Hike at Mt. Rainier",
  description:
    "Experience the magic of sunrise from the stunning viewpoint at Mt. Rainier. Perfect for photographers and early birds! We'll start early to catch the golden hour and enjoy breakfast at the summit.",
  date: "May 15, 2025",
  time: "5:30 AM",
  location: "Mt. Rainier National Park",
  maxSize: 8,
  currentSize: 6,
  status: "upcoming",
  leader: {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=100&width=100",
    hikerType: "experienced",
    rating: 4.8,
    hikesLed: 12,
  },
  trail: {
    name: "Eagle Peak Trail",
    distance: "7.5 km",
    elevation: "650 m",
    duration: "4-5 hours",
    difficulty: "Moderate",
  },
  meetingPoint: {
    description: "Paradise Visitor Center Parking Lot",
    coordinates: {
      latitude: 46.7869,
      longitude: -121.7356,
    },
  },
  participants: [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      hikerType: "experienced",
      status: "confirmed",
      isLeader: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      image: "/placeholder.svg?height=100&width=100",
      hikerType: "experienced",
      status: "confirmed",
      isLeader: false,
    },
    {
      id: 3,
      name: "Emma Davis",
      image: "/placeholder.svg?height=100&width=100",
      hikerType: "new",
      status: "confirmed",
      isLeader: false,
    },
    {
      id: 4,
      name: "Alex Rivera",
      image: "/placeholder.svg?height=100&width=100",
      hikerType: "experienced",
      status: "confirmed",
      isLeader: false,
    },
    {
      id: 5,
      name: "Lisa Park",
      image: "/placeholder.svg?height=100&width=100",
      hikerType: "new",
      status: "pending",
      isLeader: false,
    },
    {
      id: 6,
      name: "David Kim",
      image: "/placeholder.svg?height=100&width=100",
      hikerType: "experienced",
      status: "confirmed",
      isLeader: false,
    },
  ],
  requirements: [
    "Bring headlamp or flashlight",
    "Warm layers for early morning",
    "Camera for sunrise photos",
    "Breakfast/snacks",
    "Minimum intermediate hiking experience",
  ],
  weather: {
    condition: "Clear skies",
    temperature: "12°C - 18°C",
    precipitation: "0%",
  },
}



export function GroupDetails({params : groupId }) {
  const [isJoined, setIsJoined] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser] = useState({ id: 999, name: "Current User" }) // Mock current user

  const handleJoinGroup = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsJoined(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleLeaveGroup = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsJoined(false)
      setIsLoading(false)
    }, 1000)
  }

  const isGroupFull = mockGroup.currentSize >= mockGroup.maxSize
  const isCurrentUserLeader = mockGroup.leader.id === currentUser.id
  const isCurrentUserParticipant = mockGroup.participants.some((p) => p.id === currentUser.id) || isJoined

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Group Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{mockGroup.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>
                      {mockGroup.date} at {mockGroup.time}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{mockGroup.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {isCurrentUserLeader && (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{mockGroup.description}</p>

            {/* Status Alert */}
            {isGroupFull && !isCurrentUserParticipant && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This group is currently full. You can join the waitlist to be notified if a spot opens up.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isCurrentUserParticipant && !isCurrentUserLeader && (
                <Button onClick={handleJoinGroup} disabled={isLoading || (isGroupFull && !isJoined)} className="flex-1">
                  {isLoading ? "Joining..." : isGroupFull ? "Join Waitlist" : "Join Group"}
                </Button>
              )}

              {isCurrentUserParticipant && !isCurrentUserLeader && (
                <Button variant="outline" onClick={handleLeaveGroup} disabled={isLoading} className="flex-1">
                  {isLoading ? "Leaving..." : "Leave Group"}
                </Button>
              )}

              {(isCurrentUserParticipant || isCurrentUserLeader) && (
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Open Chat
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Trail Information */}
        <Card>
          <CardHeader>
            <CardTitle>Trail Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{mockGroup.trail.name}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-primary mr-2" />
                    <div>
                      <div className="text-sm font-medium">Distance</div>
                      <div className="text-sm text-muted-foreground">{mockGroup.trail.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mountain className="h-4 w-4 text-primary mr-2" />
                    <div>
                      <div className="text-sm font-medium">Elevation</div>
                      <div className="text-sm text-muted-foreground">{mockGroup.trail.elevation}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <div>
                      <div className="text-sm font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">{mockGroup.trail.duration}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Difficulty</div>
                    <Badge
                      variant={
                        mockGroup.trail.difficulty === "Easy"
                          ? "default"
                          : mockGroup.trail.difficulty === "Moderate"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {mockGroup.trail.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Meeting Point</h4>
                <div className="flex items-start gap-2">
                  <Navigation className="h-4 w-4 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{mockGroup.meetingPoint.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {mockGroup.meetingPoint.coordinates.latitude}, {mockGroup.meetingPoint.coordinates.longitude}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Weather Forecast</h4>
                <div className="text-sm">
                  <div>
                    <strong>Condition:</strong> {mockGroup.weather.condition}
                  </div>
                  <div>
                    <strong>Temperature:</strong> {mockGroup.weather.temperature}
                  </div>
                  <div>
                    <strong>Precipitation:</strong> {mockGroup.weather.precipitation}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockGroup.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{requirement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Group Leader */}
        <Card>
          <CardHeader>
            <CardTitle>Group Leader</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockGroup.leader.image || "/placeholder.svg"} alt={mockGroup.leader.name} />
                <AvatarFallback>{mockGroup.leader.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{mockGroup.leader.name}</div>
                <div className="text-sm text-muted-foreground capitalize">{mockGroup.leader.hikerType} Hiker</div>
                <div className="text-sm text-muted-foreground">
                  ⭐ {mockGroup.leader.rating} • {mockGroup.leader.hikesLed} hikes led
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Participants</span>
              <Badge variant="outline">
                {mockGroup.currentSize}/{mockGroup.maxSize}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockGroup.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.image || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        {participant.name}
                        {participant.isLeader && (
                          <Badge variant="secondary" className="text-xs">
                            Leader
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">{participant.hikerType}</div>
                    </div>
                  </div>
                  <Badge variant={participant.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                    {participant.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
