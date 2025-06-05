import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './pages/Hero'
import ScorePage from './pages/ScorePage'
import AddResume from './pages/AddResume'
import Register from './auth/Register'
import Login from './auth/Login'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import ProtectedRoutes from './auth/ProtectedRoutes'
import About from "./pages/About"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/about' element={<About/>}/>

        {/* Protected routes below */}
        <Route
          path="/CheckScore"
          element={
            
              <ScorePage />
          
          }
        />
        <Route
          path="/Addresume"
          element={
            
              <AddResume />
            
          }
        />
        <Route
          path="/dashboard/resumes"
          element={
            <Dashboard />
            }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
