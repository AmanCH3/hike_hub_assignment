import React from 'react'
import  { BrowserRouter, Route , Routes} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import App from '../App'
import LandingPage from '../pages/LandingPage'
// import MainLayout from '../layouts/MainLayout'
// import LandingPage from '../pages/LandingPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        {/* <Route path = "/" element =  {<LandingPage/>} ></Route> */}
        {/* <Route path = "" element = {<App/> } ></Route>
         */}
         <Route path='' element = {<LandingPage/>}></Route>
        <Route path='/login' element = {<LoginPage/>}>

        </Route>
    </Routes>
    </BrowserRouter>
  )
}
