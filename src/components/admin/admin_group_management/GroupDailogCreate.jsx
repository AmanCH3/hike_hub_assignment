// src/components/admin/group_management/GroupCreateDialog.jsx
"use client"

import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card ,CardHeader , CardTitle , CardDescription, CardContent} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, ImageIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCreateGroup } from "../../../hooks/useGroup"
import { useAdminTrail } from "../../../hooks/admin/useAdminTrail"
import { useAdminUser } from "../../../hooks/admin/userAdminUser"
import { toast } from "react-toastify"



export function CreateGroupFormAdmin({ user, onSuccess }) {
  const navigate = useNavigate();
  const { mutate: createGroup, isPending: isLoading } = useCreateGroup();
  const { trails: availableTrails = [] } = useAdminTrail(); // Default to empty array
  const {users : leader = []} = useAdminUser() ;

  const [date, setDate] = useState();
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [imagePreview, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    maxSize: 6,
    meetingPoint: "",
    difficulty: "moderate", 
    leader : "",
    trail: "",
   
  });

   useEffect(() => {
    return () => {
      imagePreview.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const MAX_FILES = 5;

    if (imageFiles.length + files.length > MAX_FILES) {
        toast.error(`You can only upload a maximum of ${MAX_FILES} images.`);
        return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large (Max 5MB).`);
        return false;
      }
      return true;
    });

    setImageFiles((prevFiles) => [...prevFiles, ...validFiles]);

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    URL.revokeObjectURL(imagePreview[indexToRemove]);
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const addRequirement = () => {
    const trimmed = newRequirement.trim();
    if (trimmed && !requirements.includes(trimmed)) {
      setRequirements([...requirements, trimmed]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (req) => {
    setRequirements(requirements.filter((r) => r !== req));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error("You must be logged in to create a group.");
      return;
    }
    if (!formData.trail || !date) {
      toast.error("Please select a trail and a date for the hike.");
      return;
    }

    const submissionData = new FormData();

    // Append all required fields
    submissionData.append("title", formData.title);
    submissionData.append("description", formData.description);
    submissionData.append("maxSize", formData.maxSize);
    submissionData.append("meetingPoint", formData.meetingPoint);
    submissionData.append("trail", formData.trail);
    submissionData.append("date", date.toISOString());
    submissionData.append("difficulty", formData.difficulty); 
    submissionData.append("leader", user._id); 
    submissionData.append("status", "upcoming"); 

    imageFiles.forEach((file) => {
      submissionData.append("photo", file);
    }); 

   
    requirements.forEach((req) => submissionData.append("requirements[]", req));
    console.log(submissionData)

    createGroup(submissionData, {
      onSuccess: () => {
        toast.success("Group created successfully!")
        imagePreview.forEach(preview => URL.revokeObjectURL(preview));
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || "Failed to create group.";
        toast.error(errorMessage);
        console.error("Group creation error:", error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Create a New Hiking Group (Admin)</CardTitle>
          <CardDescription>Fill in the details below to schedule a new group hike.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Group Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Sunrise Hike to Nagarkot" required />
              </div>
              <div>
                <Label htmlFor="trail">Trail</Label>
                <Select name="trail" onValueChange={(value) => handleSelectChange('trail', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a trail" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTrails.map((trail) => (
                      <SelectItem key={trail._id} value={trail._id}>
                        {trail.name} - <span className="text-muted-foreground">{trail.location}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
                           <div>
                <Label htmlFor="user">Leader</Label>
                <Select name="user" onValueChange={(value) => handleSelectChange('user', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a leader" />
                  </SelectTrigger>
                  <SelectContent>
                    {leader.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe the hike, what to expect, etc." />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxSize">Max Group Size</Label>
                    <Input id="maxSize" name="maxSize" type="number" value={formData.maxSize} onChange={handleInputChange} min={2} required />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select name="difficulty" value={formData.difficulty} onValueChange={(value) => handleSelectChange('difficulty', value)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="difficult">Difficult</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
              </div>
              <div>
                <Label htmlFor="meetingPoint">Meeting Point</Label>
                <Input id="meetingPoint" name="meetingPoint" value={formData.meetingPoint} onChange={handleInputChange} placeholder="e.g., Jawalakhel Bus Stop" required/>
              </div>
            </div>
          </div>
          
          {/* Full-width sections */}
          <div>
            <Label>Cover Images (Up to 5)</Label>
            {/* ✨ FIX 8: Add `multiple` attribute to the file input */}
            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="mt-2" multiple />
            
            {/* ✨ FIX 9: Correctly map over previews to display all selected images */}
            <div className="mt-4 flex flex-wrap gap-4">
              {imagePreview.map((preview, index) => (
                <div key={index} className="relative w-32 h-20">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Requirements (Optional)</Label>
            <div className="flex gap-2">
              <Input value={newRequirement} onChange={(e) => setNewRequirement(e.target.value)} placeholder="e.g., Hiking Boots, Water Bottle" />
              <Button type="button" onClick={addRequirement}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {requirements.map((req) => (
                <span key={req} className="bg-secondary text-secondary-foreground px-3 py-1 text-sm rounded-full flex items-center">
                  {req}
                  <X className="ml-2 cursor-pointer w-4 h-4 hover:text-destructive" onClick={() => removeRequirement(req)} />
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Group..." : "Create Group"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}