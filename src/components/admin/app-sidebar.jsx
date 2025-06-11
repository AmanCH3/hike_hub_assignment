"use client"
import { BarChart3, CheckSquare, CreditCard, Home, MapPin, Mountain, Settings, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: Home,
          isActive: true,
        },
        {
          title: "Analytics",
          url: "/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "User Management",
          url: "/users",
          icon: Users,
        },
        {
          title: "Trail Management",
          url: "/trails",
          icon: MapPin,
        },
        {
          title: "Group Hikes",
          url: "/hikes",
          icon: Mountain,
        },
        {
          title: "Checklist Templates",
          url: "/checklists",
          icon: CheckSquare,
        },
      ],
    },
    {
      title: "Financial",
      items: [
        {
          title: "Payments & Reports",
          url: "/payments",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Mountain className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-lg font-bold">HikeHub</h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
