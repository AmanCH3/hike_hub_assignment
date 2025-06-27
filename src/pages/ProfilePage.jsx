import React, { useState } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Navbar from '../layouts/Header';
import Footer from '../layouts/Footer';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { HikingStats } from '../components/profile/HikingStats';
import { EditProfileDialog } from '../components/profile/EditProfileDialog';

export default function ProfilePage() {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const { data: user, isLoading, isError, error } = useUserProfile();

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-24 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-[500px] w-full lg:col-span-1" />
            <Skeleton className="h-[500px] w-full lg:col-span-2" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-24 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message || "Failed to load user profile. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50/50">
        <main className="container mx-auto py-12 px-4 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProfileInfo user={user} onEdit={() => setEditDialogOpen(true)} />
            </div>
            <div className="lg:col-span-2">
              <HikingStats stats={user.stats} />
            </div>
          </div>
        </main>
      </div>
      <EditProfileDialog
        user={user}
        isOpen={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
      <Footer />
    </>
  );
}