// App.jsx
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Feedback from './pages/Feedback';
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/Privacy-policy';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUser(decoded.sub); // You can also store more info if needed
      } catch (error) {
        console.error('Invalid token:', error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />
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
