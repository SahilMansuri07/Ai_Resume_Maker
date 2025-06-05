import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ResumeGenie AI</h2>
          <p className="text-sm text-white/70 max-w-sm">
            Build powerful resumes and beat ATS algorithms effortlessly with our AI-powered platform.
        {/* Navigation Links */}
          </p>
        </div>

        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/builder" className="hover:text-indigo-400">Resume Builder</a></li>
              <li><a href="/Checkscore" className="hover:text-indigo-400">ATS Score Checker</a></li>
              <li><a href="/pricing" className="hover:text-indigo-400">Pricing</a></li>
              <li><a href="/faq" className="hover:text-indigo-400">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-indigo-400">About Us</a></li>
              <li><a href="/blog" className="hover:text-indigo-400">Blog</a></li>
              <li><a href="/contact" className="hover:text-indigo-400">Contact</a></li>
              <li><a href="/privacy" className="hover:text-indigo-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Connect with us</h3>
          <address className="not-italic text-sm text-white/70">
            <span className="block">📧 Email: <a href="mailto:sahilmansuri881.o@gmail.com" className="hover:text-indigo-400">sahilmansuri881.o@gmail.com</a></span>
          </address>
          <div className="flex space-x-4 text-xl mt-3">
            <a href="#" className="hover:text-indigo-400" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" className="hover:text-indigo-400" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-indigo-400" aria-label="GitHub"><FaGithub /></a>
          </div>
          <p className="text-xs text-white/40 mt-6">&copy; {new Date().getFullYear()} ResumeGenie AI. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
