"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, ImageIcon, Paperclip, MapPin, Users } from "lucide-react"
import { format, isToday, isYesterday } from "date-fns"

// Mock chat data
const mockMessages = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      isLeader: true,
    },
    content:
      "Hey everyone! Looking forward to our sunrise hike tomorrow. Don't forget to bring your headlamps and warm layers!",
    timestamp: new Date(2025, 4, 14, 18, 30),
    type: "text",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Mike Chen",
      image: "/placeholder.svg?height=100&width=100",
      isLeader: false,
    },
    content: "Excited! What time should we meet at the parking lot?",
    timestamp: new Date(2025, 4, 14, 18, 45),
    type: "text",
  },
  {
    id: 3,
    user: {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      isLeader: true,
    },
    content:
      "Let's meet at 5:30 AM sharp. The sunrise is at 6:15, so we'll have plenty of time to reach the viewpoint.",
    timestamp: new Date(2025, 4, 14, 19, 0),
    type: "text",
  },
  {
    id: 4,
    user: {
      id: 3,
      name: "Emma Davis",
      image: "/placeholder.svg?height=100&width=100",
      isLeader: false,
    },
    content: "Should I bring my DSLR camera or will phone camera be enough?",
    timestamp: new Date(2025, 4, 14, 19, 15),
    type: "text",
  },
  {
    id: 5,
    user: {
      id: 4,
      name: "Alex Rivera",
      image: "/placeholder.svg?height=100&width=100",
      isLeader: false,
    },
    content: "Definitely bring the DSLR! The sunrise shots will be amazing. I'm bringing my tripod too.",
    timestamp: new Date(2025, 4, 14, 19, 30),
    type: "text",
  },
  {
    id: 6,
    user: {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      isLeader: true,
    },
    content: "Here's the exact meeting location:",
    timestamp: new Date(2025, 4, 14, 20, 0),
    type: "location",
    location: {
      name: "Paradise Visitor Center Parking Lot",
      coordinates: "46.7869, -121.7356",
    },
  },
  {
    id: 7,
    user: {
      id: 6,
      name: "David Kim",
      image: "/placeholder.svg?height=100&width=100",
      isLeader: false,
    },
    content: "Perfect! See you all bright and early tomorrow 🌅",
    timestamp: new Date(2025, 4, 14, 20, 15),
    type: "text",
  },
]

const mockParticipants = [
  { id: 1, name: "Sarah Johnson", image: "/placeholder.svg?height=100&width=100", isLeader: true, online: true },
  { id: 2, name: "Mike Chen", image: "/placeholder.svg?height=100&width=100", isLeader: false, online: true },
  { id: 3, name: "Emma Davis", image: "/placeholder.svg?height=100&width=100", isLeader: false, online: false },
  { id: 4, name: "Alex Rivera", image: "/placeholder.svg?height=100&width=100", isLeader: false, online: true },
  { id: 6, name: "David Kim", image: "/placeholder.svg?height=100&width=100", isLeader: false, online: false },
]

// 

export function GroupChat({ groupId }) {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [currentUser] = useState({ id: 999, name: "Current User" })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        image: "/placeholder.svg?height=100&width=100",
        isLeader: false,
      },
      content: newMessage,
      timestamp: new Date(),
      type: "text" ,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatMessageTime = (timestamp) => {
    if (isToday(timestamp)) {
      return format(timestamp, "HH:mm")
    } else if (isYesterday(timestamp)) {
      return `Yesterday ${format(timestamp, "HH:mm")}`
    } else {
      return format(timestamp, "MMM d, yyyy")
    }
  }

  const groupMessagesByDate = (messages) => {
    messages.forEach((message) => {
      const dateKey = format(message.timestamp, "yyyy-MM-dd")
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(message)
    })

    return groups
  }

  const messageGroups = groupMessagesByDate(messages)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Chat Messages */}
      <div className="lg:col-span-3">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Group Chat
              <Badge variant="secondary" className="ml-auto">
                {mockParticipants.filter((p) => p.online).length} online
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
                  <div key={dateKey}>
                    <div className="flex items-center justify-center my-4">
                      <Separator className="flex-1" />
                      <span className="px-3 text-xs text-muted-foreground bg-background">
                        {isToday(new Date(dateKey))
                          ? "Today"
                          : isYesterday(new Date(dateKey))
                            ? "Yesterday"
                            : format(new Date(dateKey), "MMMM d, yyyy")}
                      </span>
                      <Separator className="flex-1" />
                    </div>

                    {dayMessages.map((message) => (
                      <div key={message.id} className="flex gap-3 mb-4">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={message.user.image || "/placeholder.svg"} alt={message.user.name} />
                          <AvatarFallback>{message.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{message.user.name}</span>
                            {message.user.isLeader && (
                              <Badge variant="secondary" className="text-xs">
                                Leader
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(message.timestamp)}
                            </span>
                          </div>

                          {message.type === "text" && (
                            <p className="text-sm text-foreground break-words">{message.content}</p>
                          )}

                          {message.type === "location" && message.location && (
                            <div className="bg-muted rounded-lg p-3 max-w-sm">
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="font-medium text-sm">Location</span>
                              </div>
                              <p className="text-sm">{message.location.name}</p>
                              <p className="text-xs text-muted-foreground">{message.location.coordinates}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <div className="flex gap-1">
                  <Button type="button" variant="ghost" size="icon" className="h-9 w-9">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-9 w-9">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-9 w-9">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participants Sidebar */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Participants</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="px-4 space-y-3">
                {mockParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={participant.image || "/placeholder.svg"} alt={participant.name} />
                        <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                          participant.online ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium truncate">{participant.name}</span>
                        {participant.isLeader && (
                          <Badge variant="secondary" className="text-xs">
                            Leader
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{participant.online ? "Online" : "Offline"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
