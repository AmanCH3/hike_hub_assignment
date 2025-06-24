import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import SignUpPage from "../pages/SignUpPage";
import TrailsPage from "../pages/TrailsPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../components/admin/DashBoardPage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import ChecklistManagementPage from "../pages/admin/ChecklistManagementPage";
import GroupHikeManagementPage from "../pages/admin/GroupHikeManagement";
import PaymentManagementPage from "../pages/admin/PaymentManagementPage";
import TrailManagementPage from "../pages/admin/TrailManagement";
import AdminLayout from "../layouts/admin/AdminLayout";
import GroupsPage from "../pages/GroupPage";
import ProtectedRoute from "../components/protectedRoutes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GroupDetails } from "../components/admin/group_management/group_detail";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="trails" element={<TrailsPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="groups" element={<GroupsPage />} />
        </Route>

        {/* Admin Routes with AdminLayout, protected by ProtectedRoute */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <SidebarProvider>
                <AdminLayout />
              </SidebarProvider>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="checklists" element={<ChecklistManagementPage />} />
          <Route path="hikes" element={<GroupHikeManagementPage />} />
          <Route path="payments" element={<PaymentManagementPage />} />
          <Route path="trail" element={<TrailManagementPage />} />
           <Route path="groups/:groupId" element={<GroupDetails/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}