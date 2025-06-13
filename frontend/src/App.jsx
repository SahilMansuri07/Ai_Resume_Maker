// App.jsx
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './pages/Hero';
import ScorePage from './pages/ScorePage';
import AddResume from './pages/AddResume';
import Register from './auth/Register';
import Login from './auth/Login';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './auth/ProtectedRoutes';
import About from './pages/About';
import EditResume from './pages/EditResume';
import Blog from './pages/Blog';

export default function App() {
  const [user, setUser] = useState(null);// loading state added
  const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser(decoded.sub);  // Use `sub` (email) as the username
      }
    }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/about" element={<About />} />

        {/* Protected routes */}
        <Route
          path="/CheckScore"
          element={
            <ProtectedRoutes user={user}>
              <ScorePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Addresume"
          element={
            <ProtectedRoutes user={user}>
              <AddResume />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/resumes/resume/update/:id"
          element={
            <ProtectedRoutes user={user}>
              <AddResume />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/editresume/:id"
          element={
            <ProtectedRoutes user={user}>
              <EditResume />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/resumes"
          element={
            <ProtectedRoutes user={user}> 
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
