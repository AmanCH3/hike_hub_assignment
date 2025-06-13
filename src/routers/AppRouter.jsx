import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import SignUpPage from "../pages/SignUpPage";
import TrailsPage from "../pages/TrailsPage";
import { SidebarProvider } from "@/components/ui/sidebar"
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import MainLayout from "../layouts/MainLayout";

import DashboardPage from "../components/admin/DashBoardPage";
import UserManagementPage from "../layouts/admin/UserManagementPage";
import ChecklistManagementPage from "../layouts/admin/ChecklistManagementPage";
import GroupHikeManagementPage from "../layouts/admin/GroupHikeManagement";
import PaymentManagementPage from "../layouts/admin/PaymentManagementPage";
import TrailManagementPage from "../layouts/admin/TrailManagement";
import { AppSidebar } from "../components/admin/app-sidebar";
import AdminLayout from "../layouts/admin/AdminLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/trails" element={<TrailsPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Admin Layout with Sidebar */}

        <Route
          path="/admin/*"
          element={
            <SidebarProvider>
              <Routes>
                <Route path="/" element={<AdminLayout />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="users" element={<UserManagementPage />} />
                  <Route
                    path="checklists"
                    element={<ChecklistManagementPage />}
                  />
                  <Route path="hikes" element={<GroupHikeManagementPage />} />
                  <Route path="payments" element={<PaymentManagementPage />} />
                  <Route path="trails" element={<TrailManagementPage />} />
                </Route>
              </Routes>
            </SidebarProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
