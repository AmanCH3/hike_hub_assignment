import React from 'react'; // No need for useState if using Formik
import { useRegistrationUser } from '../../hooks/useRegisterUser'; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; 

export default function RegisterForm() {
  // Corrected hook name to useRegistrationUser
  const { mutate, data, error, isPending, isSuccess, isError } = useRegistrationUser();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Full name is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match') 
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", 
      phone: ""
    },
    validationSchema,
    onSubmit: (values) => {
  
      const { name, email, password, phone } = values;
      mutate({ name, email, password, phone });
    }
  });




  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-gray-700 text-sm font-medium">Full name</label>
        <input
          id="name" 
          type="text"
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="John Doe"
          {...formik.getFieldProps('name')} 
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-gray-700 text-sm font-medium">Email</label>
        <input
          id="email" 
          type="email"
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="name@example.com"
          {...formik.getFieldProps('email')} 
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className="text-gray-700 text-sm font-medium">New Password</label>
        <input
          id="password" 
          type="password"
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="******"
          {...formik.getFieldProps('password')} 
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-gray-700 text-sm font-medium">Confirm Password</label>
        <input
          id="confirmPassword" 
          type="password"
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="******"
          {...formik.getFieldProps('confirmPassword')} 
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="phone" className="text-gray-700 text-sm font-medium">Contact No</label>
        <input
          id="phone" 
          type="tel"
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="+977-9800000000"
          {...formik.getFieldProps('phone')} // Use Formik's getFieldProps
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500 text-sm">{formik.errors.phone}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        disabled={isPending || !formik.isValid || !formik.dirty} // Disable button if pending, invalid, or no changes
      >
        {isPending ? 'Creating Account...' : 'Create an Account'}
      </button>

    </form>
  );
}