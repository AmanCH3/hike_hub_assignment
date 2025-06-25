// src/components/admin/group_management/group_detail.jsx
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  MapPin,
  Clock,
  Mountain,
  Navigation, // Not used, consider removing
  Share2,
  Star,
  CloudSun, // Not used, consider removing
  Thermometer, // Not used, consider removing
  Droplets, // Not used, consider removing
  Route,
  Check,
  X,
} from "lucide-react";
import { useRequestToJoinGroup , useApproveJoinRequest , useDenyJoinRequest } from "../../hooks/useGroup";
import { JoinGroupDialog } from "./join_group_dailog";
import { GroupChat } from "./group_chat";




const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    if (typeof duration === 'object' && duration.min !== undefined && duration.max !== undefined) {
        if (duration.min === duration.max) return `${duration.max} hours`;
        return `${duration.min}-${duration.max} hours`;
    }
    return `${duration} hours`;
};

// Helper to get the correct color for the difficulty badge
const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy': return 'bg-green-100 text-green-800 hover:bg-green-100';
        case 'Moderate': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
        case 'Difficult': return 'bg-red-100 text-red-800 hover:bg-red-100'; // Corrected 'Hard' to 'Difficult'
        default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
}

// NOTE: The component now receives `group` and `user` as props
export function GroupDetails({ group, user }) {


   const [isJoinDialogOpen, setJoinDialogOpen] = useState(false);
  // If no group data is passed, don't render anything.
  if (!group) {
    return <div className="text-center text-gray-500 mt-10">Group data is not available.</div>;
  }
  
  // All mutation hooks remain for functionality inside the modal
  const requestJoinMutation = useRequestToJoinGroup(); 
  const approveMutation = useApproveJoinRequest(); 
  const denyMutation = useDenyJoinRequest(); 
  
  // Destructure with default values for safety
  const {
    _id : groupId,
    title,
    description,
    date,
    maxSize,
    leader, // leader will be populated User object
    participants = [], // participants array from model
    status, // status from model
    meetingPoint, // meetingPoint from model
    requirements = [], // requirements from model
    difficulty, // difficulty from model
    photos = [], // photos from model
    comments = [], // comments from model
    trail, // trail will be populated Trail object
  } = group;

  // Assuming 'time' and 'location' are part of the 'group' object or derived from 'meetingPoint' / 'trail'
  // If 'time' is not explicitly on group, you might need to derive it from 'date' or add it to the model.
  // For 'location', use trail?.location or meetingPoint?.description as appropriate.
  const displayTime = new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const displayLocation = trail?.location || meetingPoint?.description || 'Not specified';
  const displayDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  // Filter confirmed participants
  const confirmedParticipants = participants.filter(p => p.status === 'confirmed');
  const currentSize = confirmedParticipants.length;
  const isGroupFull = currentSize >= maxSize;
  
  // Identify current user's role and request status
  const isCurrentUserLeader = leader?._id === user?._id;
  const currentUserParticipantEntry = participants.find(p => p.user?._id === user?._id); 
  const isCurrentUserConfirmedParticipant = currentUserParticipantEntry?.status === 'confirmed';
  const hasPendingRequest = currentUserParticipantEntry?.status === 'pending';
  
  const pendingJoinRequests = participants.filter(p => p.status === 'pending'); 

    const handleSendJoinRequest = ({ message }) => {
    requestJoinMutation.mutate({ groupId, data: { message } });
  };
  const handleApprove = (requestId) => approveMutation.mutate({ groupId, requestId });
  const handleDeny = (requestId) => denyMutation.mutate({groupId, requestId });

   const canViewChat = isCurrentUserLeader || isCurrentUserConfirmedParticipant;

  return (
    <>
     <JoinGroupDialog
        open={isJoinDialogOpen}
        setOpen={setJoinDialogOpen}
        groupTitle={group.title}
        onJoin={handleSendJoinRequest} // Pass the new handler
      />

     

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 max-h-[90vh] overflow-y-auto">
      <div className="lg:col-span-2 space-y-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-500 mt-2">
                  <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /><span>{displayDate} at {displayTime}</span></div>
                  <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /><span>{displayLocation}</span></div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex"><Share2 className="h-4 w-4 mr-2" />Share</Button>
            </div>
            <p className="text-gray-600 mb-6">{description}</p>
              {!isCurrentUserConfirmedParticipant && !isCurrentUserLeader && (
                <Button onClick={() => setJoinDialogOpen(true)} disabled={isGroupFull || hasPendingRequest || requestJoinMutation.isPending} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-lg">
                    {hasPendingRequest ? "Request Pending" : isGroupFull ? "Group Full" : "Request to Join"}
                </Button>
            )}
            {isCurrentUserConfirmedParticipant && !isCurrentUserLeader && (
                <Badge className="w-full justify-center py-2 text-lg bg-blue-100 text-red-500">You are a participant!</Badge>
            )}
            {isCurrentUserLeader && (
                <Badge className="w-full justify-center py-2 text-lg bg-blue-50 text-purple-800">You are the leader!</Badge>
            )}
          </CardContent>
        </Card>
         {canViewChat && (
            <Card>
              <CardHeader><CardTitle className="text-xl">Group Chat</CardTitle></CardHeader>
              <CardContent>
                <GroupChat groupId={groupId} currentUser={user} />
              </CardContent>
            </Card>
          )}

        <Card>
          <CardHeader><CardTitle className="text-xl">Trail Information</CardTitle></CardHeader>
          <CardContent className="space-y-6">
              <div>
                  <h3 className="text-lg font-semibold text-gray-800">{trail?.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{trail?.description}</p> {/* Added trail description if available */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
                      <div className="flex gap-3 items-center"><Route className="h-6 w-6 text-indigo-600"/><div className="text-sm"><div className="text-gray-500">Distance</div><div className="font-semibold text-gray-800">{trail?.distance} km</div></div></div>
                      <div className="flex gap-3 items-center"><Mountain className="h-6 w-6 text-indigo-600"/><div className="text-sm"><div className="text-gray-500">Elevation</div><div className="font-semibold text-gray-800">{trail?.elevation} m</div></div></div>
                      <div className="flex gap-3 items-center"><Clock className="h-6 w-6 text-indigo-600"/><div className="text-sm"><div className="text-gray-500">Duration</div><div className="font-semibold text-gray-800">{formatDuration(trail?.duration)}</div></div></div>
                      <div><div className="text-sm text-gray-500 mb-1">Difficulty</div><Badge className={getDifficultyBadgeColor(trail?.difficult)}>{trail?.difficult}</Badge></div> {/* Use trail?.difficult for trail difficulty */}
                  </div>
              </div>
          </CardContent>
        </Card>

        {photos && photos.length > 0 && (
            <Card>
                <CardHeader><CardTitle className="text-xl">Photos</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo, index) => (
                          <img
                                key={index}
                                src={`http://localhost:5050/${photo}`} // Adjust path if needed
                                alt={`Group hike ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md shadow-sm"
                                />
                              ))}
                    </div>
                </CardContent>
            </Card>
        )}

        {comments && comments.length > 0 && (
          <Card>
                <CardHeader><CardTitle className="text-xl">Comments</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment._id || comment.id} className="border-b pb-3 last:border-b-0">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                                {comment.user?.name || 'Anonymous'}
                                <span className="text-gray-500 text-xs font-normal">
                                    {new Date(comment.createAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-gray-700 mt-1">{comment.text}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader><CardTitle className="text-xl">Group Leader</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={leader?.profileImage} alt={leader?.name} /> {/* Use profileImage from User model */}
                <AvatarFallback>{leader?.name?.substring(0, 2) || "L"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-lg text-gray-800">{leader?.name}</div>
                <div className="text-sm text-gray-500">{leader?.hikerType} Hiker</div>
                {/* Assuming leader also has rating and hikesLed stats from User model */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    {leader?.stats?.totalHikes !== undefined && (
                      <>
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold text-gray-700">{leader?.averageRating?.toFixed(1) || 'N/A'}</span> {/* Assuming averageRating exists on User model for leaders */}
                            <span className="text-gray-400">•</span>
                            <span>{leader?.stats?.hikesLed} hikes led</span> {/* Access from stats.hikesLed */}
                        </>
                    )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isCurrentUserLeader && pendingJoinRequests.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-xl">Join Requests ({pendingJoinRequests.length})</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {pendingJoinRequests.map(req => (
                <div key={req._id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={req.user?.profileImage} alt={req.user?.name} /> {/* Use profileImage from User model */}
                            <AvatarFallback>{req.user?.name?.substring(0, 2) || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium text-sm text-gray-800">{req.user?.name}</div>
                            <p className="text-xs text-gray-500 line-clamp-1" title={req.message}>{req.message || 'No message.'}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button size="icon" variant="outline" className="h-8 w-8 bg-green-100 hover:bg-green-200" onClick={() => handleApprove(req._id)} disabled={approveMutation.isPending}><Check className="h-4 w-4 text-green-700"/></Button>
                        <Button size="icon" variant="outline" className="h-8 w-8 bg-red-100 hover:bg-red-200" onClick={() => handleDeny(req._id)} disabled={denyMutation.isPending}><X className="h-4 w-4 text-red-700"/></Button>
                    </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle className="flex items-center justify-between text-xl"><span>Participants</span><Badge variant="secondary">{currentSize}/{maxSize}</Badge></CardTitle></CardHeader>
          <CardContent><div className="space-y-4">
            {confirmedParticipants.map((p) => (
              <div key={p._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={p.user?.profileImage} alt={p.user?.name} /> {/* Access profileImage from p.user */}
                    <AvatarFallback>{p.user?.name?.charAt(0) || "P"}</AvatarFallback>
                  </Avatar>
                  <div>
                      <div className="font-medium text-sm text-gray-800 flex items-center gap-2">
                        {p.user?.name}
                        {p.user?._id === leader?._id && <Badge className="bg-indigo-100 text-indigo-700 text-xs hover:bg-indigo-100">Leader</Badge>} {/* Check if this participant is also the leader */}
                      </div>
                      <div className="text-xs text-gray-500">{p.user?.hikerType}</div> {/* Access hikerType from p.user */}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
              </div>
            ))}
          </div></CardContent>
        </Card>
      </div>
    </div>
        </>
  );
}