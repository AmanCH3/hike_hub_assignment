import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Import your UI components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// 1. Define the validation schema outside the component
const editUserSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().oneOf(['User', 'Guide']) ,
  status: Yup.string().oneOf(['Active', 'Suspended'], 'Invalid Status').required('Status is required'),
  phone: Yup.string().optional(),
  address: Yup.string().optional(),
});


export function EditUserDailog({ open, onOpenChange, user, onUpdate }) {
  
  const handleUpdateSubmit = (values, { setSubmitting }) => {
    if (user) {
      onUpdate(user._id, values);
    }
    setSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User: {user?.name}</DialogTitle>
          <DialogDescription>Update user information and settings</DialogDescription>
        </DialogHeader>

        {/* 2. Use the Formik component to wrap your form */}
        <Formik
          // 3. Set initial values from the 'user' prop
          initialValues={{
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role || 'User',
            status: user?.status || 'Active',
            phone: user?.phone || '',
            address: user?.address || '',
          }}
          validationSchema={editUserSchema}
          onSubmit={handleUpdateSubmit}
          // 4. Important: This re-initializes the form when the user prop changes
          enableReinitialize={true} 
        >
          {/* 5. Use Formik's render props to get form state and handlers */}
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Full Name *</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* 6. Display validation errors */}
                  <ErrorMessage name="name" component="div" className="text-destructive text-sm mt-1" />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email Address *</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="email" component="div" className="text-destructive text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-role">Role</Label>
                  {/* 7. Handle custom components like Select */}
                  <Select
                    value={values.role}
                    onValueChange={(value) => setFieldValue('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="role" component="div" className="text-destructive text-sm mt-1" />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={values.status}
                    onValueChange={(value) => setFieldValue('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="status" component="div" className="text-destructive text-sm mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Textarea
                  id="edit-address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                {/* 8. Use type="submit" and disable the button during submission */}
                <Button type="submit" disabled={isSubmitting}>
                  Update User
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}