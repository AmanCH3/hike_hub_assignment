"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Users, MapPin, Mountain, DollarSign, TrendingUp, Calendar, AlertCircle } from "lucide-react"

const userGrowthData = [
  { month: "Jan", users: 1200, revenue: 15000 },
  { month: "Feb", users: 1350, revenue: 18000 },
  { month: "Mar", users: 1500, revenue: 22000 },
  { month: "Apr", users: 1680, revenue: 25000 },
  { month: "May", users: 1850, revenue: 28000 },
  { month: "Jun", users: 2100, revenue: 32000 },
]

const hikeData = [
  { month: "Jan", completed: 45, cancelled: 5 },
  { month: "Feb", completed: 52, cancelled: 3 },
  { month: "Mar", completed: 68, cancelled: 7 },
  { month: "Apr", completed: 75, cancelled: 4 },
  { month: "May", completed: 82, cancelled: 6 },
  { month: "Jun", completed: 95, cancelled: 2 },
]

const recentActivities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "Joined group hike",
    trail: "Mount Washington Trail",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "Completed payment",
    trail: "Appalachian Trail Section",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    user: "Emma Davis",
    action: "Created new trail",
    trail: "Sunset Ridge Path",
    time: "6 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    user: "Alex Rodriguez",
    action: "Updated checklist template",
    trail: "Winter Hiking Essentials",
    time: "8 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,100</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trails</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Group Hikes</CardTitle>
            <Mountain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">23</span> scheduled this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+14.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              User Growth & Revenue
            </CardTitle>
            <CardDescription>Monthly user registration and revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Users",
                  color: "hsl(var(--chart-1))",
                },
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="2"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              Hike Completion Rate
            </CardTitle>
            <CardDescription>Completed vs cancelled group hikes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                completed: {
                  label: "Completed",
                  color: "hsl(var(--chart-3))",
                },
                cancelled: {
                  label: "Cancelled",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hikeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="completed" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="cancelled" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest user actions and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.trail}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add New User
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Create Trail
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Mountain className="mr-2 h-4 w-4" />
              Schedule Hike
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system health and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">API Status: Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">Database: Healthy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Storage: 78% Used</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">Payments: Active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
