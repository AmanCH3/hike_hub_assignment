import React from 'react'
import  { BrowserRouter, Route , Routes} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import App from '../App'
import LandingPage from '../pages/LandingPage'
import SignUpPage from '../pages/SignUpPage'
import TrailsPage from '../pages/TrailsPage'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../layouts/Header'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
// import MainLayout from '../layouts/MainLayout'
// import LandingPage from '../pages/LandingPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        {/* <Route path = "/" element =  {<LandingPage/>} ></Route> */}
        {/* <Route path = "" element = {<App/> } ></Route>
         */}
         <Route element = {<MainLayout/>}>
          
         <Route path='' element = {<LandingPage/>}></Route>
         <Route path = "/trails" element = {<TrailsPage/>}></Route>
         <Route path='/forgotpassword' element = {<ForgotPasswordPage/>}></Route>
         <Route path = "/signup" element = {<SignUpPage/>}></Route>
        <Route path='/login' element = {<LoginPage/>}>
         </Route>

        </Route>
    </Routes>
    </BrowserRouter>
  )
}
