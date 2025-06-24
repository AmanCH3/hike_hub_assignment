// src/components/admin/group_management/GroupCreateDialog.jsx
"use client"

import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function GroupCreateDialog({ isOpen, onOpenChange, formData, setFormData, handleCreateHike, isCreating }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Hike
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Group Hike</DialogTitle>
          <DialogDescription>Create a new group hiking event</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hike-name">Hike Name *</Label>
              <Input
                id="hike-name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter hike name"
              />
            </div>
            <div>
              <Label htmlFor="hike-trail">Trail *</Label>
              <Select value={formData.trail} onValueChange={(value) => setFormData({ ...formData, trail: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a trail" />
                </SelectTrigger>
                <SelectContent>
                  {/* TODO: Dynamically fetch trails from your API and populate these */}
                  <SelectItem value="6839572e2dc7f0fb0d12971b">Emerald Ridge Trail</SelectItem>
                  <SelectItem value="trail_id_2">Sunset Ridge Path</SelectItem>
                  <SelectItem value="trail_id_3">Forest Loop Trail</SelectItem>
                  <SelectItem value="trail_id_4">Alpine Lake Circuit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="hike-date">Date *</Label>
              <Input
                id="hike-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="hike-max-participants">Max Participants</Label>
              <Input
                id="hike-max-participants"
                type="number"
                min="2"
                max="20"
                value={formData.maxSize}
                onChange={(e) =>
                  setFormData({ ...formData, maxSize: Number.parseInt(e.target.value) || 10 })
                }
              />
            </div>
            <div>
              <Label htmlFor="hike-difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Difficult">Difficult</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hike-guide">Leader *</Label>
              <Select value={formData.guide} onValueChange={(value) => setFormData({ ...formData, guide: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a leader" />
                </SelectTrigger>
                <SelectContent>
                  {/* TODO: Dynamically fetch users with 'guide' or 'admin' roles for this */}
                  <SelectItem value="68582ff880cf997be402de78">John Doe (Guide)</SelectItem>
                  <SelectItem value="user_id_2">Jane Smith (Guide)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hike-meeting">Meeting Point</Label>
              <Input
                id="hike-meeting"
                value={formData.meetingPoint}
                onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
                placeholder="Where participants should meet"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="hike-description">Description</Label>
            <Textarea
              id="hike-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the hike experience and highlights"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="hike-requirements">Requirements</Label>
            <Textarea
              id="hike-requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Fitness level, gear requirements, etc."
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateHike}
              disabled={isCreating}
            >
              {isCreating ? "Scheduling..." : "Schedule Hike"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}