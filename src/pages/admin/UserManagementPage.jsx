"use client";

import { useState } from "react";
import { useAdminUser, useCreateUser, useDeleteUser, useUpdateUser } from "../../hooks/admin/userAdminUser";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Users } from "lucide-react";

// import { CreateUserDialog } from "../../components/admin/user_management/CreateUserDailog";
import {CreateUserDialog} from "../../components/admin/user_management/CreateUserDailog"
import { ViewUserDialog } from "../../components/admin/user_management/ViewUserDailog";
import { EditUserDailog } from "../../components/admin/user_management/EditUserDailog";
import { DeleteUserDialog } from "../../components/admin/user_management/DeleteUserDailog";
import { UserCard } from "../../components/admin/user_management/Usercard";
// import { DeleteUserDialog } from "../../components/admin/user_management/DeleteUserDialog";
// import { UserCard } from "../../components/admin/user_management";

export default function UserManagementPage() {
  
  const { users, isLoading, error, setFilters } = useAdminUser();
  const { mutate: createUser } = useCreateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();

  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // --- HANDLERS ---
  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const openViewDialog = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleCreate = (formData) => {
    createUser(formData);
    setIsCreateOpen(false);
  };

  const handleUpdate = (id, data) => {
    updateUser({ id, data });
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser._id);
      setIsDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage application users and their roles</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-center text-destructive">{error.message}</p>}

      {!isLoading && !error && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onView={() => openViewDialog(user)}
                onEdit={() => openEditDialog(user)}
                onDelete={() => openDeleteDialog(user)}
              />
            ))}
          </div>

          {users.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Dialogs */}
      <CreateUserDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreate={handleCreate}
      />
      <ViewUserDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        user={selectedUser}
      />
      <EditUserDailog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        user={selectedUser}
        onUpdate={handleUpdate}
      />
      <DeleteUserDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        user={selectedUser}
        onDelete={handleDelete}
      />
    </div>
  );
}
