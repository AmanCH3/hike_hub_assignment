import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, X } from "lucide-react";
import { useCreateTrail } from "../../../hooks/admin/useAdminTrail"; // Make sure the path is correct

const INITIAL_FORM_STATE = {
  name: "",
  location: "",
  difficult: "Easy",
  duration_min: "", // Changed for nested duration
  duration_max: "", // Changed for nested duration
  distance: "",
  elevation: "",
  description: "",
  features: "", // Will be comma-separated string
  seasons: "",  // Will be comma-separated string
};

export function CreateTrailDialog({ open, onOpenChange }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const { mutate: createTrail, isLoading } = useCreateTrail();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = new FormData();

    // Append standard fields
    submissionData.append("name", formData.name);
    submissionData.append("location", formData.location);
    submissionData.append("difficult", formData.difficult);
    submissionData.append("distance", formData.distance);
    submissionData.append("elevation", formData.elevation);
    submissionData.append("description", formData.description);


    // Handle nested duration object
    if (formData.duration_min) submissionData.append("duration[min]", formData.duration_min);
    if (formData.duration_max) submissionData.append("duration[max]", formData.duration_max);

    // Handle array fields by splitting comma-separated strings
    if (formData.features) {
      const featuresArray = formData.features.split(',').map(f => f.trim());
      for (const feature of featuresArray) {
        submissionData.append("features[]", feature);
      }
    }
    if (formData.seasons) {
      const seasonsArray = formData.seasons.split(',').map(s => s.trim());
      for (const season of seasonsArray) {
        submissionData.append("seasons[]", season);
      }
    }

    console.log(formData)

    // Append image files
    for (const file of imageFiles) {
      submissionData.append("images", file); // Backend expects the key "images"
    }

    createTrail(submissionData, {
      onSuccess: () => {
        setFormData(INITIAL_FORM_STATE);
        setImageFiles([]);
        setImagePreviews([]);
        onOpenChange(false);
      
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Trail</DialogTitle>
          <DialogDescription>Create a new hiking trail for the platform.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Trail Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="location">Location (Geo-coordinates or City ID as Number)</Label>
              <Input id="location" type="number" value={formData.location} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="difficult">Difficulty</Label>
              <Select value={formData.difficult} onValueChange={(value) => handleSelectChange('difficult', value)}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Difficult">Difficult</SelectItem> {/* Corrected typo */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="distance">Distance (km)</Label>
              <Input id="distance" type="number" value={formData.distance} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="elevation">Elevation (meters)</Label>
              <Input id="elevation" type="number" value={formData.elevation} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="duration_min">Min Duration (hours)</Label>
                <Input id="duration_min" type="number" placeholder="e.g., 4" value={formData.duration_min} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="duration_max">Max Duration (hours)</Label>
                <Input id="duration_max" type="number" placeholder="e.g., 6" value={formData.duration_max} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} rows={4} />
          </div>
          <div>
            <Label htmlFor="features">Key Features (comma-separated)</Label>
            <Textarea id="features" placeholder="e.g., Waterfalls, Viewpoints, Wildlife" value={formData.features} onChange={handleChange} rows={2}/>
          </div>
          <div>
            <Label htmlFor="seasons">Best Seasons (comma-separated)</Label>
            <Input id="seasons" placeholder="e.g., Spring, Autumn" value={formData.seasons} onChange={handleChange} />
          </div>

          <div>
            <Label>Images</Label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <Label htmlFor="images" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500">
                    <span>Click to upload</span>
                    <Input id="images" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*"/>
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`Preview ${index + 1}`} className="h-24 w-24 object-cover rounded-md"/>
                  <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center -mt-2 -mr-2">
                    <X size={16}/>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Trail"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}