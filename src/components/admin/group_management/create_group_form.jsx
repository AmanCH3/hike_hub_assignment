"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use react-router-dom hook
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Clock, Mountain, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCreateGroup } from "../../../hooks/useGroup"; // Import the hook
import { useAdminTrail } from "../../../hooks/admin/useAdminTrail"; // To get real trails

export function CreateGroupForm() {
  const navigate = useNavigate();
  const { mutate: createGroup, isPending: isLoading } = useCreateGroup();
  const { trails: availableTrails } = useAdminTrail();

  const [selectedTrail, setSelectedTrail] = useState(null);
  const [date, setDate] = useState();
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    maxSize: 6,
    meetingPoint: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleTrailSelect = (trailId) => {
    const trail = availableTrails.find((t) => t._id === trailId);
    setSelectedTrail(trail);
  };

  const addRequirement = () => {
    if (
      newRequirement.trim() &&
      !requirements.includes(newRequirement.trim())
    ) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (requirement) => {
    setRequirements(requirements.filter((r) => r !== requirement));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTrail || !date) {
      alert("Please select a trail and date");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("description", formData.description);
    submissionData.append("maxSize", formData.maxSize);
    submissionData.append("date", date.toISOString());
    submissionData.append("trail", selectedTrail._id);
    submissionData.append("meetingPoint", formData.meetingPoint);
    if (formData.image) {
      submissionData.append("image", formData.image);
    }
    requirements.forEach((req) => submissionData.append("requirements[]", req));

    createGroup(submissionData, {
      onSuccess: () => {
        navigate("/groups");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ... The rest of the form JSX remains largely the same ... */}
      {/* Make sure to replace mock `availableTrails` with the fetched one */}
      <Select onValueChange={handleTrailSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a trail" />
        </SelectTrigger>
        <SelectContent>
          {availableTrails.map((trail) => (
            <SelectItem key={trail._id} value={trail._id.toString()}>
              {trail.name} - {trail.location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* ... other form fields ... */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Creating Group..." : "Create Group"}
        </Button>
      </div>
    </form>
  );
}