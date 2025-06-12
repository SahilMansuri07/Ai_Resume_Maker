import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineAssessment } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <main className="bg-gradient-to-br from-[#0f172a] via-[#0a1f5c] to-[#5a189a] text-white overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed top-[-80px] left-[-80px] w-[300px] h-[300px] bg-purple-800 opacity-20 blur-3xl rounded-full animate-pulse-slow z-0 pointer-events-none" />
      <div className="fixed bottom-[-80px] right-[-80px] w-[260px] h-[260px] bg-indigo-700 opacity-25 blur-2xl rounded-full animate-pulse-slower z-0 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 lg:grid lg:h-screen lg:place-content-center">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 rounded-full shadow border border-white/10">
            <IoRocketSharp className="text-purple-300 text-2xl" />
            <span className="text-purple-100 font-semibold tracking-wide text-lg">ResumeGenie AI</span>
          </div>
          <h1 className="text-[clamp(1.3rem,3.2vw,2.6rem)] font-extrabold drop-shadow-lg leading-tight">
            Build a Job-Winning Resume <br />
            <span className="text-purple-400 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-200 bg-clip-text text-transparent animate-gradient">
              with AI-powered Functionality
            </span>
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto font-light">
            Instantly craft a professional, ATS-friendly resume and check your resume’s score with smart AI optimization.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/CheckScore"
              aria-label="Check your resume ATS score"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-700 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:scale-105 hover:from-blue-700 hover:to-purple-800 transition"
            >
              <MdOutlineAssessment className="mr-2 text-2xl" />
              Check ATS Score
            </Link>
            <Link
              to="/Addresume"
              aria-label="Build your resume"
              className="inline-flex items-center rounded-xl border border-white/40 bg-white/10 text-white px-8 py-3 text-lg font-semibold hover:bg-white hover:text-[#5a189a] hover:scale-105 transition"
            >
              <IoRocketSharp className="mr-2 text-xl" />
              Build Resume
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 max-w-6xl mx-auto text-center">
        <h3 className="text-4xl font-extrabold text-purple-200 mb-12 drop-shadow-lg">Features</h3>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <IoRocketSharp />,
              title: "AI Resume Builder",
              text: "Generate stunning resumes with AI-assisted formatting and smart content."
            },
            {
              icon: <MdOutlineAssessment />,
              title: "ATS Score Checker",
              text: "Analyze how well your resume performs with Applicant Tracking Systems."
            },
            {
              icon: <FiDownload />,
              title: "One-Click Download",
              text: "Export your resume in professional formats like PDF with one click."
            }
          ].map(({ icon, title, text }, index) => (
            <motion.div
              key={index}
              className="bg-white/10 p-8 rounded-2xl flex justify-center items-center flex-col shadow-lg border border-white/20 hover:scale-105 transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex text-purple-300 justify-center items-center text-4xl mb-4 drop-shadow">{icon}</span>
              <h4 className="text-2xl font-semibold text-purple-100 mb-2">{title}</h4>
              <p className="text-white/90 text-lg">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className="relative z-10 py-20 text-center px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-block bg-white/10 p-4 rounded-full shadow border border-white/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L3 12l6.75-5M14.25 7l6.75 5-6.75 5" />
              </svg>
            </div>
            <h3 className="text-4xl font-extrabold text-purple-200 drop-shadow-lg">What We Do</h3>
            <p className="text-white/85 mt-2 text-xl font-light">
              Empowering you to stand out in your job search with smart, AI-driven tools.
            </p>
          </motion.div>
          <motion.article
            className="bg-white/10 rounded-2xl shadow-2xl p-10 text-white/85 text-left space-y-6 text-xl border border-white/10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              We combine the power of <span className="font-semibold text-purple-400">AI technology</span> and sleek design to help job seekers build
              modern, professional resumes in minutes. Our platform not only helps you generate a resume with smart suggestions,
              but also includes an <span className="font-semibold text-purple-200">ATS score checker</span> to analyze and improve your resume’s compatibility
              with Applicant Tracking Systems used by top companies.
            </p>
            <p>
              You can download your resume with one click in clean, recruiter-friendly formats that work across industries.
              All of this is done with a focus on user experience, speed, and precision.
              Whether you're a fresh graduate or an experienced professional, we’re here to ensure your resume makes the right impact.
            </p>
          </motion.article>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 text-center px-4">
        <h3 className="text-4xl font-extrabold text-purple-200 mb-12 drop-shadow-lg">What Our Users Say</h3>
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {[
            {
              quote: "This AI Resume Builder is a game-changer! I created a professional resume in minutes and landed 3 interviews in a week.",
              name: "– Aisha R., Marketing Specialist"
            },
            {
              quote: "The ATS score checker helped me optimize my resume perfectly. I finally passed the filter for my dream job!",
              name: "– Rahul M., Software Developer"
            },
            {
              quote: "Super easy to use and beautifully designed templates. The one-click download saved me so much time.",
              name: "– Priya D., UX Designer"
            }
          ].map(({ quote, name }, index) => (
            <motion.div
              key={index}
              className="bg-white/10 p-8 rounded-2xl text-white/90 border border-white/20 shadow-lg flex flex-col justify-between min-h-[220px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="italic text-lg">“{quote}”</p>
              <p className="mt-6 font-semibold text-purple-200">{name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Final CTA */}
     <section className="relative z-10 py-20 text-center px-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-[#5a189a] shadow-inner overflow-hidden">
  {/* Decorative Top Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-36 bg-gradient-to-r from-purple-400/30 via-indigo-400/20 to-purple-300/30 blur-3xl rounded-full pointer-events-none" />
  {/* CTA Content */}
  <div className="relative z-10 max-w-2xl mx-auto">
    <div className="inline-block bg-white/10 border border-white/20 rounded-full px-7 py-3 shadow-lg mb-6 animate-pulse-slow">
      <span className="text-purple-200 font-bold text-lg tracking-wide flex items-center gap-2">
        <svg className="w-6 h-6 text-purple-300 animate-bounce" fill="currentColor" viewBox="0 0 20 20"><path d="M10.185 2.073a1 1 0 0 1 1.63 0l6.504 8.84A1 1 0 0 1 17.504 12H2.496a1 1 0 0 1-.815-1.087l6.504-8.84ZM10 4.662 4.593 11h10.814L10 4.662ZM2 13a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z"/></svg>
        Supercharge Your Career!
      </span>
    </div>
    <h3 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-100 mb-6 drop-shadow-lg tracking-tight">
      Ready to Build Your Resume?
    </h3>
    <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto font-light">
      Start your journey with our beautiful, AI-powered resume builder. Make your first impression count!
    </p>
    <Link
      to="/Addresume"
      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xl py-4 px-10 rounded-2xl shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-purple-400"
    >
      <svg className="w-7 h-7 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Get Started Now
    </Link>
  </div>
  {/* Decorative Bottom Glow */}
  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2/3 h-14 bg-gradient-to-r from-purple-400/30 via-indigo-400/20 to-purple-300/30 blur-2xl rounded-full pointer-events-none" />
  <style>{`
    @keyframes pulse-slow { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.35; } }
    .animate-pulse-slow { animation: pulse-slow 6s infinite; }
  `}</style>
</section>

      {/* Animated background blob keyframes */}
      <style>{`
        @keyframes pulse-slow { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.35; } }
        @keyframes pulse-slower { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.4; } }
        .animate-pulse-slow { animation: pulse-slow 6s infinite; }
        .animate-pulse-slower { animation: pulse-slower 10s infinite; }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 4s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0%,100% {background-position:0% 50%}
          50%{background-position:100% 50%}
        }
      `}</style>
    </main>
  );
}