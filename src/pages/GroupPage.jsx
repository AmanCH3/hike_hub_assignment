// src/pages/GroupsPage.jsx
import { useState } from "react";
import { useGroup } from "../hooks/useGroup";
import { GroupCard } from "../components/user_group_management/group_card";
import { GroupDetails } from "../components/user_group_management/group_detail";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// A mock user object for demonstration. 
// In a real app, you would get this from your authentication context.
const MOCK_USER = {
  _id: "user123",
  name: "Current User",
  // ... other user properties
};


export default function GroupsPage() {
  const { group: allGroups, isLoading } = useGroup();
  
  // State to hold the group object for the detail view modal
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 6;
  const totalPages = Math.ceil(allGroups.length / groupsPerPage);

  // Get groups for current page
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = allGroups.slice(indexOfFirstGroup, indexOfLastGroup);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  // This function is passed to the GroupCard to set the selected group
  const handleViewDetails = (groupToShow) => {
      setSelectedGroup(groupToShow);
  };
  
  // This function closes the modal
  const handleCloseDetails = () => {
      setSelectedGroup(null);
  }

  return (
    <main className="container mx-auto pt-20 pb-16">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-2 p-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Hiking Groups
          </h1>
          <p className="text-gray-600 mt-1">
            Join existing hiking groups or create your own
          </p>
        </div>
        <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-sm">
          + Create Group
        </button>
      </div>

      {isLoading && <p className="text-center">Loading groups...</p>}
      {!isLoading && allGroups.length === 0 && (
        <p className="text-center">No groups found.</p>
      )}

      {/* Group Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {currentGroups.map((g) => (
          <GroupCard
            key={g._id}
            group={g}
            // Pass the handler function to the onView prop
            onView={handleViewDetails} 
          />
        ))}
      </div>

      {/* Pagination */}
      {!isLoading && allGroups.length > 0 && (
        <div className="flex justify-center items-center gap-4 pt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      
      {/* Detail Modal */}
      {/* This dialog will appear whenever selectedGroup is not null */}
      <Dialog open={!!selectedGroup} onOpenChange={(isOpen) => !isOpen && handleCloseDetails()}>
          <DialogContent className="max-w-4xl p-0 border-0">
              {/* Pass the selected group data and user data to the details component */}
              <GroupDetails group={selectedGroup} user={MOCK_USER} />
          </DialogContent>
      </Dialog>
    </main>
  );
}