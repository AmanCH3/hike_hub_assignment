"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Search, Download, DollarSign, CreditCard, TrendingUp, Users } from "lucide-react"

const payments = [
  {
    id: 1,
    transactionId: "TXN-2024-001",
    user: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    hike: "Mount Washington Summit Adventure",
    amount: 150,
    status: "Completed",
    method: "Credit Card",
    date: "2024-06-15",
    time: "14:30",
  },
  {
    id: 2,
    transactionId: "TXN-2024-002",
    user: "Mike Chen",
    email: "mike.chen@email.com",
    hike: "Sunset Ridge Evening Hike",
    amount: 75,
    status: "Completed",
    method: "PayPal",
    date: "2024-06-14",
    time: "09:15",
  },
  {
    id: 3,
    transactionId: "TXN-2024-003",
    user: "Emma Davis",
    email: "emma.davis@email.com",
    hike: "Family Forest Adventure",
    amount: 45,
    status: "Pending",
    method: "Credit Card",
    date: "2024-06-13",
    time: "16:45",
  },
  {
    id: 4,
    transactionId: "TXN-2024-004",
    user: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    hike: "Alpine Lake Challenge",
    amount: 200,
    status: "Completed",
    method: "Bank Transfer",
    date: "2024-06-12",
    time: "11:20",
  },
  {
    id: 5,
    transactionId: "TXN-2024-005",
    user: "Lisa Wang",
    email: "lisa.wang@email.com",
    hike: "Weekend Warriors Hike",
    amount: 150,
    status: "Failed",
    method: "Credit Card",
    date: "2024-06-11",
    time: "13:10",
  },
]

const revenueData = [
  { month: "Jan", revenue: 15000, transactions: 120 },
  { month: "Feb", revenue: 18000, transactions: 145 },
  { month: "Mar", revenue: 22000, transactions: 180 },
  { month: "Apr", revenue: 25000, transactions: 200 },
  { month: "May", revenue: 28000, transactions: 225 },
  { month: "Jun", revenue: 32000, transactions: 250 },
]

const paymentMethodData = [
  { name: "Credit Card", value: 65, color: "#0088FE" },
  { name: "PayPal", value: 25, color: "#00C49F" },
  { name: "Bank Transfer", value: 10, color: "#FFBB28" },
]

export function PaymentsReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.hike.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter
    const matchesMethod = methodFilter === "all" || payment.method.toLowerCase().includes(methodFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const totalRevenue = payments.reduce(
    (sum, payment) => (payment.status === "Completed" ? sum + payment.amount : sum),
    0,
  )

  const completedTransactions = payments.filter((p) => p.status === "Completed").length
  const pendingTransactions = payments.filter((p) => p.status === "Pending").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments & Reports</h1>
          <p className="text-muted-foreground">Monitor transactions and generate financial reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTransactions}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue and transaction volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Percentage",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {paymentMethodData.map((method) => (
                <div key={method.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                    <span className="text-sm">{method.name}</span>
                  </div>
                  <span className="text-sm font-medium">{method.value}%</span>
                </div>
              ))}
            </div>
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
                placeholder="Search by user, email, transaction ID, or hike..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions ({filteredPayments.length})</CardTitle>
          <CardDescription>Latest payment transactions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Hike</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="font-mono text-sm">{payment.transactionId}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.user}</div>
                      <div className="text-sm text-muted-foreground">{payment.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">{payment.hike}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${payment.amount}</div>
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{payment.date}</div>
                      <div className="text-sm text-muted-foreground">{payment.time}</div>
                    </div>
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
