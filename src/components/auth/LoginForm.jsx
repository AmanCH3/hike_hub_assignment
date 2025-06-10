import { useFormik } from "formik";
import * as Yup from 'yup'
import useLoginUser from "../../hooks/useLoginUser";
export default function LoginForm(){

    const {mutate , data , error , isPending} = useLoginUser()

    //validation using yup
    const validationSchema = Yup.object(
        {
            email : Yup.string().email("Invalid email").required("Email required") ,
            password : Yup.string().min(8 ,"Min 8 character required").required("Password required")
        }
    )

    const formik = useFormik (
        {
            initialValues : {
                email : "" ,
                password : ""
            } ,
            validationSchema : validationSchema ,
            onSubmit : (data) => {
                mutate(data)
            }
        }
    )

    return (
        
            <form onSubmit={formik.handleSubmit} className="space-y-4 ">
            <div>
              <label className=" text-gray-700 text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="name@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              /> {
                formik.touched.email && formik.errors.email && 
                <p>{formik.errors.email}</p>
              }
            </div>
            
            <div>
              <label className=" text-gray-700 text-sm font-medium mb-1">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="******"
                 onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />{
                formik.touched.password && formik.errors.password && 
                <p>{formik.errors.password}</p>
              }

              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                  Forgot Password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Sign In
            </button>
            
          </form>


      
    )
}