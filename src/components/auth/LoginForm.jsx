import { useFormik } from "formik";
import * as Yup from 'yup';
import useLoginUser from "../../hooks/useLoginUser";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ✅ Import this

export default function LoginForm() {
  const navigate = useNavigate(); // ✅ Hook to navigate programmatically
  const { mutate, data, error, isSuccess , isPending } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Redirect on success
  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          required
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-900 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full pl-4 pr-10 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-600"
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

      {error && <p className="text-red-600 mt-2 text-sm">Login failed. Please check your credentials.</p>}
    </form>
  );
}
