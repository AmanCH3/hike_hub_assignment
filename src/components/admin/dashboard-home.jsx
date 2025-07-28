"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Users, MapPin, Mountain, DollarSign, TrendingUp, Calendar, AlertCircle, X, Check, Clock, Loader2 } from "lucide-react"
import { useGetAllPendingRequests , useApproveJoinRequest , useDenyJoinRequest } from "../../hooks/useGroup"

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

const pendingJoinRequests = [
  {
    id: 1,
    groupName: "Weekend Warriors",
    trailName: "Mount Washington Trail",
    date: "2024-07-15",
    difficulty: "Moderate",
    requesterName: "John Smith",
    requestTime: "2 hours ago",
  },
  {
    id: 2,
    groupName: "Sunrise Hikers",
    trailName: "Blue Ridge Parkway",
    date: "2024-07-20",
    difficulty: "Easy",
    requesterName: "Lisa Chen",
    requestTime: "4 hours ago",
  },
  {
    id: 3,
    groupName: "Mountain Climbers",
    trailName: "Rocky Mountain Peak",
    date: "2024-07-25",
    difficulty: "Hard",
    requesterName: "Mike Johnson",
    requestTime: "1 day ago",
  },
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
   const { data: pendingRequestsData, isLoading: isLoadingRequests } = useGetAllPendingRequests();
   const approveMutation = useApproveJoinRequest();
  const denyMutation = useDenyJoinRequest();

    const pendingJoinRequests = pendingRequestsData?.data || [];

   const handleApproveRequest = (requestId, groupId) => {
    approveMutation.mutate({ requestId, groupId });
  };

 const handleDenyRequest = (requestId, groupId) => {
    denyMutation.mutate({ requestId, groupId });
  };
  // const getDifficultyColor = (difficulty) => {
  //   switch (difficulty.toLowerCase()) {
  //     case 'easy':
  //       return 'text-green-600 bg-green-50';
  //     case 'moderate':
  //       return 'text-yellow-600 bg-yellow-50';
  //     case 'hard':
  //       return 'text-red-600 bg-red-50';
  //     default:
  //       return 'text-gray-600 bg-gray-50';
  //   }
  // };

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

      {/* System Status and Join Requests */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Join Requests
            </CardTitle>
            <CardDescription>Group join requests awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {/* 3. Add loading state */}
              {isLoadingRequests ? (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : pendingJoinRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No pending requests
                </p>
              ) : (
                // 4. Map over REAL data from the hook
                pendingJoinRequests.map((request) => (
                  <div key={request._id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{request.group?.title}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{request.group?.trail?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{new Date(request.group?.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded-full font-medium ${(request.group?.trail?.difficult)}`}>
                            {request.group?.trail?.difficult}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{request.user?.name}</span>
                          <span className="text-muted-foreground"> requested to join.</span>
                        </div>
                        {request.message && (
                            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md border">"{request.message}"</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          // Pass the correct IDs from the live data
                          onClick={() => handleApproveRequest(request._id, request.group._id)}
                          disabled={approveMutation.isPending || denyMutation.isPending}
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          // Pass the correct IDs from the live data
                          onClick={() => handleDenyRequest(request._id, request.group._id)}
                          disabled={approveMutation.isPending || denyMutation.isPending}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}