import { useState } from "react";
import { useGroup } from "../hooks/useGroup";
import { GroupCard } from "../components/admin/group_management/group_card";
// import { GroupDetails } from "../components/admin/group_management/group_detail";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GroupsPage() {
  const { group, isLoading } = useGroup();
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 6;
  const totalPages = Math.ceil(group.length / groupsPerPage);

  // Get groups for current page
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = group.slice(indexOfFirstGroup, indexOfLastGroup);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <main className="container mx-auto pt-24 pb-16">
      <h1 className="text-2xl font-semibold mb-6 text-center">Group Management</h1>

      {isLoading && <p className="text-center">Loading groups...</p>}
      {!isLoading && group.length === 0 && <p className="text-center">No groups found.</p>}

      {/* Group Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentGroups.map((g) => (
          <div
            key={g._id}
            onClick={() => setSelectedGroupId(g._id)}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <GroupCard
              group={{
                ...g,
                trail: g.trail ?? {
                  name: "Unknown",
                  elevation: "N/A",
                  duration: { min: "N/A", max: "N/A" },
                  distance: "N/A",
                },
              }}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!isLoading && group.length > 0 && (
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
    </main>
  );
}
