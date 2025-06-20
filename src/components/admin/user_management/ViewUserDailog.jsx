import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

// 1. Changed prop names to be generic: open, onOpenChange, user
export function ViewUserDialog({ open, onOpenChange, user }) {
  // 2. Use the new, correct prop names here
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            {/* 3. Changed all instances of 'selectedUser' to 'user' */}
            Detailed information about {user?.name}
          </DialogDescription>
        </DialogHeader>

        {user && ( // Check if 'user' exists before rendering details
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback className="text-lg">
                  {(user.name || "")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={
                      user.role === "Guide" ? "default" : "secondary"
                    }
                  >
                    {user.role}
                  </Badge>
                  <Badge
                    variant={
                      user.status === "Active"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Join Date</Label>
                <p className="text-sm text-muted-foreground">
                  {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Last Active</Label>
                <p className="text-sm text-muted-foreground">
                  {user.lastActive ? new Date(user.lastActive).toLocaleString() : "N/A"}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Hikes Completed</Label>
                <p className="text-sm text-muted-foreground">
                  {user.hikesCompleted || 0}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm text-muted-foreground">
                  {user.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Address</Label>
              <p className="text-sm text-muted-foreground">
                {user.address || "Not provided"}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}