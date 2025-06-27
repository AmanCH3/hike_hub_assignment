// // layouts/MainLayout.jsx
// import React from 'react'
// import Navbar from './Header'
// import { Outlet } from 'react-router-dom'

// export default function MainLayout() {
//   return (
//     <>
//       <Navbar />
//       <main className="pt-16">
//       <Outlet />
//       </main>
//     </>
//   )
// }


import React from 'react';
import Navbar from './Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // 1. Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // 2. Import the default CSS

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      
      {/* 3. Add the ToastContainer component here */}
      <ToastContainer
        position="bottom-right" // A common and unobtrusive position
        autoClose={4000}       // Close notifications after 4 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"        // Use colored notifications (info, success, error)
      />
    </>
  );
}