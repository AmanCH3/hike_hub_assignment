// // src/components/GroupCard.jsx
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   CalendarDays,
//   MapPin,
//   Clock,
//   Mountain,
//   TrendingUp, // For elevation gain
//   Route,       // For distance
// } from "lucide-react";
// import { useNavigate } from 'react-router-dom'; // <--- Import useNavigate

// // A utility to format the duration (keeping your original logic)
// const formatDuration = (duration) => {
//   if (!duration) return 'N/A';
//   if (typeof duration === 'object' && duration.min !== undefined && duration.max !== undefined) {
//       if (duration.min === duration.max) return `${duration.max} hours`;
//       return `${duration.min}-${duration.max} hours`;
//   }
//   return duration; // Fallback if it's already a string
// };

// export function GroupCard({ group }) {
//   // console.log(group); // Removed for cleaner console output
//   const navigate = useNavigate(); // <--- Initialize useNavigate hook

//   const spotsFilled = group.participants?.length || 0;
//   const spotsTotal = group.maxSize || 0;

//   // <--- Handler to navigate to GroupDetails page
//   const handleViewDetails = () => {
//     navigate(`/group/${group._id}`); // Navigate to the specific group's detail page
//   };

//   return (
//     <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
//       <CardHeader>
//         <div className="flex justify-between items-start gap-4">
//           <CardTitle className="text-xl font-bold">{group.title}</CardTitle>
//           <Badge className="whitespace-nowrap">
//             {spotsFilled}/{spotsTotal} Spots
//           </Badge>
//         </div>
//         <div className="flex items-center text-sm text-muted-foreground pt-1">
//           <MapPin className="h-4 w-4 mr-2" />
//           <span>{group.trail?.name}</span>
//         </div>
//         <div className="flex items-center text-sm text-muted-foreground">
//            <CalendarDays className="h-4 w-4 mr-2" />
//            <span>
//              {new Date(group.date).toLocaleDateString('en-US', {
//                  month: 'long',
//                  day: 'numeric',
//                  year: 'numeric',
//              })}
//            </span>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-grow space-y-4">
//         {/* Group Leader */}
//         <div>
//           <p className="text-sm font-medium mb-2">Group Leader</p>
//           <div className="flex items-center gap-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={group.leader?.profilePicture} alt={group.leader?.name} />
//               <AvatarFallback>{group.leader?.name?.charAt(0) || 'U'}</AvatarFallback>
//             </Avatar>
//             <span className="font-semibold">{group.leader?.name || 'Unknown'}</span>
//           </div>
//         </div>

//         {/* Participants */}
//         <div>
//           <p className="text-sm font-medium mb-2">Participants</p>
//           <div className="flex items-center">
//               {/* Display first 3-4 avatars */}
//             {group.participants.slice(0, 4).map((p, i) => (
//               <Avatar key={p._id || i} className="h-8 w-8 border-2 border-background -ml-2 first:ml-0">
//                 <AvatarImage src={p.profilePicture} alt={p.name}/>
//                 {/* <AvatarFallback>{p.name.charAt(0).toUpperCase()}</AvatarFallback> */}
//               </Avatar>
//             ))}
//             {/* Show a counter for the rest */}
//             {group.participants.length > 4 && (
//               <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted text-xs font-semibold border-2 border-background -ml-2">
//                 +{group.participants.length - 4}
//               </div>
//             )}
//             <span className="text-sm text-muted-foreground ml-3">{spotsFilled} hikers</span>
//           </div>
//         </div>

//         {/* Trail Details */}
//         <div>
//           <p className="text-sm font-medium mb-2">Trail Details</p>
//           <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted-foreground">
//             <div className="flex items-center gap-2"><Mountain className="h-5 w-5 text-primary" /><span>{group.difficulty}</span></div>
//             <div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /><span>{group.trail?.elevation} m</span></div>
//             <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /><span>{formatDuration(group.trail?.duration)}</span></div>
//             <div className="flex items-center gap-2"><Route className="h-5 w-5 text-primary" /><span>{group.trail?.distance} km</span></div>
//           </div>
//         </div>

//         {/* Description */}
//           <div>
//             <p className="text-sm font-medium mb-1">Description</p>
//             <p className="text-sm text-muted-foreground line-clamp-3">{group.description}</p>
//         </div>

//       </CardContent>
//       <CardFooter>
//         <Button onClick={handleViewDetails} className="w-full bg-green-600 hover:bg-green-700">
//           View Details
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }