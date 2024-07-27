import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<AddBlog />} />
      </Routes>
    </div>
  )
}

export default App