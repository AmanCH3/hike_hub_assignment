// layouts/MainLayout.jsx
import React from 'react'
import Navbar from './Header'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
      <Outlet />
      </main>
    </>
  )
}
