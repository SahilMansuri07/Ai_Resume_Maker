import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineAssessment } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#0a1f5c] to-[#5a189a] text-white">
      {/* Hero Section */}
      <section className="lg:grid lg:h-screen lg:place-content-center">
        <motion.div 
          initial={{ opacity: 0, y: -40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Job-winning Resume with <br />
            <span className="text-purple-400">AI-powered Functionality</span>
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            AI Resume Builder helps you create customized, ATS-friendly resumes that get noticed.
            Instantly check your resume’s ATS score and optimize it.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link to={"/CheckScore"}
              
              className="inline-block rounded-lg bg-[#3b82f6] px-6 py-3 text-white font-medium hover:bg-[#2563eb] transition"
            >
              Check ATS Score
            </Link>
            <Link to={"/Addresume"}
           
              className="inline-block rounded-lg border border-white text-white px-6 py-3 font-medium hover:bg-white hover:text-[#5a189a] transition"
            >
              Build Resume
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-purple-300 mb-10">Features</h3>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          transition={{ staggerChildren: 0.3 }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[{
            icon: <IoRocketSharp />,
            title: "AI Resume Builder",
            text: "Generate stunning resumes with AI-assisted formatting and smart content."
          }, {
            icon: <MdOutlineAssessment />,
            title: "ATS Score Checker",
            text: "Analyze how well your resume performs with Applicant Tracking Systems."
          }, {
            icon: <FiDownload />,
            title: "One-Click Download",
            text: "Export your resume in professional formats like PDF with one click."
          }].map(({ icon, title, text }, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 p-6 rounded-2xl flex justify-center items-center flex-col shadow-sm border border-white/20"
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <span className="flex text-purple-300 justify-center items-center text-2xl mb-2">{icon}</span>
              <h4 className="text-xl font-semibold text-purple-200 mb-2">{title}</h4>
              <p className="text-white/80">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 text-center px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="mb-12"
          >
            <div className="inline-block bg-white/10 p-3 rounded-full shadow-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L3 12l6.75-5M14.25 7l6.75 5-6.75 5" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-purple-300">What We Do</h3>
            <p className="text-white/80 mt-2 text-lg">Empowering you to stand out in your job search with smart, AI-driven tools.</p>
          </motion.div>
          <motion.div 
            className="bg-white/10 rounded-xl shadow-lg p-8 text-white/80 text-left space-y-6 text-lg"
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <p>
              We combine the power of <span className="font-semibold text-purple-500">AI technology</span> and sleek design to help job seekers build
              modern, professional resumes in minutes. Our platform not only helps you generate a resume with smart suggestions,
              but also includes an <span className="font-semibold text-purple-200">ATS score checker</span> to analyze and improve your resume’s compatibility
              with Applicant Tracking Systems used by top companies.
            </p>
            <p>
              You can download your resume with one click in clean, recruiter-friendly formats that work across industries.
              All of this is done with a focus on user experience, speed, and precision.
              Whether you're a fresh graduate or an experienced professional, we’re here to ensure your resume makes the right impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 text-center px-4">
        <h3 className="text-3xl font-bold text-purple-300 mb-10">What Our Users Say</h3>
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          transition={{ staggerChildren: 0.3 }}
        >
          {[{
            quote: "This AI Resume Builder is a game-changer! I created a professional resume in minutes and landed 3 interviews in a week.",
            name: "– Aisha R., Marketing Specialist"
          }, {
            quote: "The ATS score checker helped me optimize my resume perfectly. I finally passed the filter for my dream job!",
            name: "– Rahul M., Software Developer"
          }, {
            quote: "Super easy to use and beautifully designed templates. The one-click download saved me so much time.",
            name: "– Priya K., Data Analyst"
          }].map(({ quote, name }, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white/10 p-6 rounded-2xl shadow-md border border-white/20"
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4 }}
            >
              <p className="text-purple-200 italic mb-4">"{quote}"</p>
              <h4 className="text-purple-100 font-semibold">{name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
