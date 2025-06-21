  "use client"
  import { BarChart3, CheckSquare, CreditCard, Home, icons, LogOut, MapPin, Mountain, Settings, Users } from "lucide-react"

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
  import { useState } from "react";
  import { LogoutModal } from "./logout-modal";
import { useAuth } from "../../auth/authProvider";

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
        ],
      },
      {
        title: "Management",
        items: [
          {
            title: "User Management",
            url: "/admin/users",
            icon: Users,
          },
          {
            title: "Trail Management",
            url: "/admin/trail",
            icon: MapPin,
          },
          {
            title: "Group Hikes",
            url: "/admin/hikes",
            icon: Mountain,
          },
          {
            title: "Checklist Templates",
            url: "/admin/checklists",
            icon: CheckSquare,
          },
        ],
      },
      {
        title: "Financial",
        items: [
          {
            title: "Payments & Reports",
            url: "/admin/payments",
            icon: CreditCard,
          },
        ],
      },
      // {
      //   title: "logout",
      //   items: [
      //     {
      //       title: "logout",
      //       url: "/admin/logout",
      //       icon: Settings,
      //     },
      //   ],
      // },
    ],
    navBottom: [
        { title: "Logout", action: "logout" , icon : LogOut},
    ]
  }


  export function AppSidebar() {
      const { logout } = useAuth();
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleLogoutClick = (e) => {
          e.preventDefault();
          setIsModalOpen(true);
      };

      const handleConfirmLogout = () => {
          logout();
          setIsModalOpen(false);
      };

      const handleCloseModal = () => {
          setIsModalOpen(false);
      };

    return (
      <>
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
              <SidebarContent className="flex flex-col justify-between">
                  <div>
                      {data.navMain.map((group) => (
                          <SidebarGroup key={group.title}>
                              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                              <SidebarGroupContent>
                                  <SidebarMenu>
                                      {group.items.map((item) => (
                                          <SidebarMenuItem key={item.title}>
                                              <SidebarMenuButton asChild isActive={item.isActive}>
                                                  <a href={item.url}>
                                                      <item.icon className="h-4 w-4" />
                                                      <span>{item.title}</span>
                                                  </a>
                                              </SidebarMenuButton>
                                          </SidebarMenuItem>
                                      ))}
                                  </SidebarMenu>
                              </SidebarGroupContent>
                          </SidebarGroup>
                      ))}
                  </div>
                  <div>
                      <SidebarGroup>
                          <SidebarGroupContent>
                              <SidebarMenu>
                                  {data.navBottom.map((item) => (
                                      <SidebarMenuItem key={item.title}>
                                          {item.action === 'logout' ? (
                                              <SidebarMenuButton onClick={handleLogoutClick} className="w-full text-red-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:text-red-500">
                                                  <item.icon className="h-4 w-4" />
                                                  <span>{item.title}</span>
                                              </SidebarMenuButton>
                                          ) : (
                                              <SidebarMenuButton asChild>
                                                  <a href={item.url}>
                                                      <item.icon className="h-4 w-2" />
                                                      <span>{item.title}</span>
                                                  </a>
                                              </SidebarMenuButton>
                                          )}
                                      </SidebarMenuItem>
                                  ))}
                              </SidebarMenu>
                          </SidebarGroupContent>
                      </SidebarGroup>
                  </div>
              </SidebarContent>
              {/* SidebarRail is often used for a collapsed state, can be empty for now */}
              <SidebarRail />
          </Sidebar>

          <LogoutModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirmLogout}
          />
          <style>{`.animate-scale-in { animation: scale-in 0.2s ease-out forwards; } @keyframes scale-in { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; }}`}</style>
      </>
    )
  }