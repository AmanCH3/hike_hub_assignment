"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Plus, Calendar, Users, MapPin } from "lucide-react"

const groupHikes = [
  {
    id: 1,
    name: "Mount Washington Summit Adventure",
    trail: "Mount Washington Trail",
    date: "2024-07-15",
    time: "06:00 AM",
    guide: "Mike Chen",
    guideAvatar: "/placeholder.svg?height=32&width=32",
    participants: 8,
    maxParticipants: 12,
    status: "Scheduled",
    difficulty: "Hard",
    price: 150,
    duration: "8-10 hours",
  },
  {
    id: 2,
    name: "Sunset Ridge Evening Hike",
    trail: "Sunset Ridge Path",
    date: "2024-07-20",
    time: "04:00 PM",
    guide: "Alex Rodriguez",
    guideAvatar: "/placeholder.svg?height=32&width=32",
    participants: 6,
    maxParticipants: 10,
    status: "Scheduled",
    difficulty: "Moderate",
    price: 75,
    duration: "4-6 hours",
  },
  {
    id: 3,
    name: "Family Forest Adventure",
    trail: "Forest Loop Trail",
    date: "2024-07-18",
    time: "09:00 AM",
    guide: "Sarah Johnson",
    guideAvatar: "/placeholder.svg?height=32&width=32",
    participants: 12,
    maxParticipants: 15,
    status: "Full",
    difficulty: "Easy",
    price: 45,
    duration: "2-3 hours",
  },
  {
    id: 4,
    name: "Alpine Lake Challenge",
    trail: "Alpine Lake Circuit",
    date: "2024-07-25",
    time: "05:30 AM",
    guide: "Mike Chen",
    guideAvatar: "/placeholder.svg?height=32&width=32",
    participants: 4,
    maxParticipants: 8,
    status: "Scheduled",
    difficulty: "Hard",
    price: 200,
    duration: "6-8 hours",
  },
  {
    id: 5,
    name: "Weekend Warriors Hike",
    trail: "Mount Washington Trail",
    date: "2024-07-12",
    time: "07:00 AM",
    guide: "Alex Rodriguez",
    guideAvatar: "/placeholder.svg?height=32&width=32",
    participants: 10,
    maxParticipants: 12,
    status: "Completed",
    difficulty: "Hard",
    price: 150,
    duration: "8-10 hours",
  },
]

export function GroupHikeManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const filteredHikes = groupHikes.filter((hike) => {
    const matchesSearch =
      hike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hike.trail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hike.guide.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || hike.status.toLowerCase() === statusFilter
    const matchesDifficulty = difficultyFilter === "all" || hike.difficulty.toLowerCase() === difficultyFilter

    return matchesSearch && matchesStatus && matchesDifficulty
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "default"
      case "full":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Group Hike Management</h1>
          <p className="text-muted-foreground">Schedule and manage group hiking events</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Hike
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Hikes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groupHikes.filter((h) => h.status === "Scheduled" || h.status === "Full").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupHikes.reduce((sum, hike) => sum + hike.participants, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month Revenue</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${groupHikes.reduce((sum, hike) => sum + hike.participants * hike.price, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search hikes by name, trail, or guide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hikes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Group Hikes ({filteredHikes.length})</CardTitle>
          <CardDescription>Manage scheduled and completed group hiking events</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hike Details</TableHead>
                <TableHead>Guide</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHikes.map((hike) => (
                <TableRow key={hike.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{hike.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {hike.trail}
                      </div>
                      <Badge className={`mt-1 ${getDifficultyColor(hike.difficulty)}`} variant="outline">
                        {hike.difficulty}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={hike.guideAvatar || "/placeholder.svg"} alt={hike.guide} />
                        <AvatarFallback>
                          {hike.guide
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{hike.guide}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{hike.date}</div>
                      <div className="text-sm text-muted-foreground">{hike.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {hike.participants}/{hike.maxParticipants}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(hike.status)}>{hike.status}</Badge>
                  </TableCell>
                  <TableCell>${hike.price}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Hike</DropdownMenuItem>
                        <DropdownMenuItem>Manage Participants</DropdownMenuItem>
                        <DropdownMenuItem>Send Updates</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel Hike</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
