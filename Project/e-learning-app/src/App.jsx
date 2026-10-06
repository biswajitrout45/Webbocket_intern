import { BrowserRouter, Routes, Route  } from "react-router-dom"
import Home from "./Pages/Home"
import Blogs from "./Pages/Blogs"
import Course from "./Pages/Course"
import BlogDetails from "./Pages/BlogDetails"
import CourseDetails from "./Pages/CourseDetails"
import Footer from "./Components/Common/Footer"
import Navbar from "./Components/Common/Navbar"
import aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
const App = () => {
  useEffect(() => {
    aos.init({
      duration: 1000
    })
},[])

  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/:id" element={<CourseDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App