import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { theme } from './components/f'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Post from './pages/Post'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Project from './pages/project'
import Projects from './pages/projects'
import Tutorials from './pages/tutorials'
import UploadTutorials from './pages/Upload_tutorials'
import Search from './pages/Search'
import Ai from './pages/Ai'



theme()

export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/tutorial/:id" element={<Project />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/upload-tutorial" element={<UploadTutorials />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
