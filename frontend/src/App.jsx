import { Routes, Route } from 'react-router-dom';
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
import { useUser } from './context/UserContext';
import ResumePreviewPage from './pages/Resume-Previewfinal';

export default function App() {
  // Access the full user object and logout from context
  const { user, logout } = useUser();

  return (
    <>
      {/* Pass no props to Header, it will read user + logout from context itself */}
      <Header />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        {/* Protected routes */}
        <Route
          path="/CheckScore"
          element={
            <ProtectedRoutes>
              <ScorePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/Addresume"
          element={
            <ProtectedRoutes>
              <AddResume />
              <ResumePreviewPage/>
            </ProtectedRoutes>
          }
        />
          <Route
          path="/resume-preview/:id"
          element={
            <ProtectedRoutes>
              <AddResume />
              <ResumePreviewPage/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/resumes/resume/update/:id"
          element={
            <ProtectedRoutes>
              <AddResume />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/editresume/:id"
          element={
            <ProtectedRoutes>
              <EditResume />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/resumes"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}