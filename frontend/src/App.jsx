import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Post from './pages/Post'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'

export default function App() {
  return (
    <> 
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<Post />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>


  )
}
