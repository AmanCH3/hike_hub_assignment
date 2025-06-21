// src/components/admin/user_management/UserCard.jsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
// 1. Import new icons we'll use
import { 
    MoreVertical, Eye, Edit, Trash2, AtSign, CalendarDays, CheckCircle, XCircle 
} from 'lucide-react';

// A small helper component to keep our code clean
const InfoItem = ({ icon: Icon, text }) => (
    <div className="flex items-center text-sm text-muted-foreground">
        <Icon className="mr-2 h-4 w-4 flex-shrink-0" />
        <span>{text}</span>
    </div>
);


export function UserCard({ user, onView, onEdit, onDelete }) {
  
  // 2. Define styles based on role for easy maintenance
  const roleStyles = {
    Guide: 'border-t-4 border-blue-500',
    User: 'border-t-4 border-gray-300',
    Admin: 'border-t-4 border-purple-500',
  };

  return (
    // 3. Add transition and hover effects for interactivity
    <Card 
        className={`transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02] ${roleStyles[user.role] || 'border-t-4 border-gray-200'}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
              <AvatarFallback className="text-xl">
                {(user.name || '')
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
                 <CardTitle className="text-lg font-medium">{user.name}</CardTitle>
                 <Badge variant={user.role === 'Guide' ? 'default' : 'secondary'} className="mt-1">
                    {user.role}
                 </Badge>
            </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onView}>
              <Eye className="mr-2 h-4 w-4" />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit User</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete User</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* 4. Use our InfoItem helper for cleaner code */}
        <InfoItem icon={AtSign} text={user.email} />
        <InfoItem 
            icon={CalendarDays} 
            text={`Joined on ${new Date(user.createdAt).toLocaleDateString()}`} 
        />
        
        {/* 5. Improved status badge with an icon for clarity */}
        {/* {user.status === 'Active' ? (
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="mr-2 h-4 w-4" />
                Active
            </Badge>
        ) : (
            <Badge variant="destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Suspended
            </Badge>
        )} */}
      </CardContent>
    </Card>
  );
}