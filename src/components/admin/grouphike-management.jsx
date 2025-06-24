// src/components/admin/group_management/group_management.jsx
"use client"

import React, { useState } from "react" // Removed useEffect as its logic moved to GroupEditDialog
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react" // Keep icons used in summary cards
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Import actual hooks from your useGroup.jsx
import {
  useGroup,
  useCreateGroup,
  useUpdateOneGroup,
  useDeleteOneGroup,
  useGetOneGroup,
} from "../../hooks/useGroup"

// Import the modular dialog components
import { GroupCreateDialog } from "./admin_group_management/GrouoDailogCreate"
import { GroupEditDialog } from "./admin_group_management/GroupDailogEdit"
import { GroupDeleteAlertDialog } from "./admin_group_management/GroupDailogDelete"
import { GroupTable } from "./admin_group_management/GroupTable"

// Import GroupDetails (ensure its path is correct)
import { GroupDetails } from "../../components/user_group_management/group_detail"


export function GroupHikeManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [selectedHikeId, setSelectedHikeId] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    trail: "",
    date: "",
    maxSize: 10,
    guide: "",
    difficulty: "Easy",
    description: "",
    requirements: "",
    meetingPoint: "",
  })

  const {
    data : groupsData,
    isLoading: isGroupsLoading,
    error: groupsError,
    setPage,
    setSearch,
  } = useGroup(1, 10, searchTerm)

   const groups = groupsData?.data || [];
  const pagination = groupsData?.pagination;

  const createGroupMutation = useCreateGroup()
  const updateGroupMutation = useUpdateOneGroup()
  const deleteGroupMutation = useDeleteOneGroup()
  const { group: selectedHikeDetails } = useGetOneGroup(selectedHikeId)

  const adminUser = { _id: "replace_with_actual_admin_id", role: "admin" }



  const handleCreateHike = () => {
    const newGroupData = {
      title: formData.title,
      trail: formData.trail,
      date: formData.date,
      description: formData.description,
      maxSize: formData.maxSize,
      leader: formData.guide,
      status: "upcoming",
      meetingPoint: { description: formData.meetingPoint },
      requirements: formData.requirements ? [formData.requirements] : [],
      difficulty: formData.difficulty,
    }

    createGroupMutation.mutate(newGroupData, {
      onSuccess: () => {
        setIsCreateDialogOpen(false)
        setFormData({
          title: "", trail: "", date: "", maxSize: 10, guide: "", difficulty: "Easy", description: "", requirements: "", meetingPoint: "",
        })
      },
    })
  }

  const handleUpdateHike = () => {
    if (!selectedHikeId) return
    const updatedGroupData = {
      title: formData.title,
      trail: formData.trail,
      date: formData.date,
      description: formData.description,
      maxSize: formData.maxSize,
      leader: formData.guide,
      meetingPoint: { description: formData.meetingPoint },
      requirements: formData.requirements ? [formData.requirements] : [],
      difficulty: formData.difficulty,
    }

    updateGroupMutation.mutate({ id: selectedHikeId, data: updatedGroupData }, {
      onSuccess: () => setIsEditDialogOpen(false),
    })
  }

  const handleDeleteHike = () => {
    if (!selectedHikeId) return
    deleteGroupMutation.mutate(selectedHikeId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false)
        setSelectedHikeId(null)
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Group Hike Management</h1>
          <p className="text-muted-foreground">Schedule and manage group hiking events</p>
        </div>

        <GroupCreateDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          formData={formData}
          setFormData={setFormData}
          handleCreateHike={handleCreateHike}
          isCreating={createGroupMutation.isPending}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagination?.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Hikes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groups?.filter(h => h.status === "upcoming").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Confirmed Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {groups.reduce((sum, group) => (
                sum + (group.participants?.filter(p => p.status === 'confirmed').length || 0)
              ), 0)}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Group Table */}
      <GroupTable
        groups={groups}
        isLoading={isGroupsLoading}
        error={groupsError}
        pagination={pagination}
        setPage={setPage}
        searchTerm={searchTerm}
        setSearch={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        setSelectedHikeId={setSelectedHikeId}
        setIsViewDialogOpen={setIsViewDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Group Hike Details</DialogTitle>
            <DialogDescription>Complete information about the selected hike</DialogDescription>
          </DialogHeader>
          {selectedHikeDetails ? (
            <GroupDetails group={selectedHikeDetails} user={adminUser} />
          ) : (
            selectedHikeId && <p>Loading details...</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <GroupEditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        formData={formData}
        setFormData={setFormData}
        handleUpdateHike={handleUpdateHike}
        isUpdating={updateGroupMutation.isPending}
        selectedHikeDetails={selectedHikeDetails}
      />

      {/* Delete Dialog */}
      <GroupDeleteAlertDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        handleDeleteHike={handleDeleteHike}
        isDeleting={deleteGroupMutation.isPending}
        selectedHikeDetails={selectedHikeDetails}
      />
    </div>
  )
}