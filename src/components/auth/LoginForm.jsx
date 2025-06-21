import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useLoginUser from "../../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const navigate = useNavigate();
  const { mutate, isPending, error , isSuccess , data } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);
  


useEffect(() => {
  
  if (isSuccess && data?.token && data?.user?.role === "admin") {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    navigate("/admin/dashboard");
  } else if (isSuccess && data?.token) {
    navigate("/");
  }
}, [isSuccess, data, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(8, "Min 8 characters required").required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values); 
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="text-gray-700 text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="name@example.com"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-900 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div className="relative">
        <label className="text-gray-700 text-sm font-medium mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="w-full pl-4 pr-10 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-600"
          {...formik.getFieldProps('password')}
        />
        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-900 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      <div className="flex justify-end mt-2">
        <a href="/forgotpassword" className="text-sm text-gray-600 hover:text-red-600">
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>

      {error && (
        <p className="text-red-600 mt-2 text-sm">
          {error.response?.data?.message || "Login failed. Please check your credentials."}
        </p>
      )}
    </form>
  );
}