import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#14032e] via-[#1d1936] to-[#3b157e] text-white pt-12 pb-7">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-14">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 mb-2 drop-shadow">
            ResumeGenie AI
          </h2>
          <p className="text-base text-white/70 max-w-sm mb-6">
            Build powerful resumes and beat ATS algorithms effortlessly with our AI-powered platform.
          </p>
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-200 mb-2"></div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between md:justify-center md:gap-16">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-200 tracking-wide">Product</h3>
            <ul className="space-y-2 text-base">
              <li><Link to={"/AddResume"} className="hover:text-purple-300 transition">Resume Builder</Link></li>
              <li><Link to={"/Checkscore"} className="hover:text-purple-300 transition">ATS Score Checker</Link></li>
              <li><Link to={"/pricing"} className="hover:text-purple-300 transition">Pricing</Link></li>
              <li><Link to={"/faq"} className="hover:text-purple-300 transition">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-200 tracking-wide">Company</h3>
            <ul className="space-y-2 text-base">
              <li><Link to={"/about"} className="hover:text-purple-300 transition">About Us</Link></li>
              <li><Link to={"/blog"} className="hover:text-purple-300 transition">Blog</Link></li>
              <li><Link to={"/contact"} className="hover:text-purple-300 transition">Contact</Link></li>
              <li><Link to={"#"} className="hover:text-purple-300 transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold mb-2 text-indigo-200 tracking-wide">Connect with us</h3>
          <address className="not-italic text-base text-white/70">
            <span className="block">📧 Email: <a href="mailto:sahilmansuri881.o@gmail.com" className="hover:text-purple-300 transition">sahilmansuri881.o@gmail.com</a></span>
          </address>
          <div className="flex space-x-5 text-2xl mt-2">
            <Link to={"#"} className="hover:text-purple-300 transition" aria-label="LinkedIn"><FaLinkedin /></Link>
            <Link to={"#"} className="hover:text-purple-300 transition" aria-label="Twitter"><FaTwitter /></Link>
            <Link to={"#"} className="hover:text-purple-300 transition" aria-label="GitHub"><FaGithub /></Link>
          </div>
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-200 mt-3"></div>
          <p className="text-xs text-white/40 mt-4">&copy; {new Date().getFullYear()} ResumeGenie AI. All rights reserved.</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40 tracking-wide">
        Crafted with <span className="text-purple-300">♥</span> by ResumeGenie Team
      </div>
    </footer>
  );
}

export default Footer;