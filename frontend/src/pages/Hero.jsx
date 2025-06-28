import { IoRocketSharp } from "react-icons/io5";
import { MdOutlineAssessment } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-12 sm:pt-24 sm:pb-20 mx-auto max-w-3xl px-4 text-center">
      
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gray-50 rounded-full shadow-sm border border-gray-200">
            <IoRocketSharp className="text-blue-600 text-2xl" />
            <span className="text-blue-700 font-semibold tracking-wide text-lg">ResumeGenie AI</span>
          </div>
          <h1 className="text-[clamp(1.6rem,3.2vw,2.7rem)] font-extrabold leading-tight">
            Build a Job-Winning Resume <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 bg-clip-text text-transparent">
              with AI-powered Functionality
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto font-normal">
            Instantly craft a professional, ATS-friendly resume and check your resume’s score with smart AI optimization.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/CheckScore"
              aria-label="Check your resume ATS score"
              className="inline-flex items-center rounded-lg bg-blue-600 px-7 py-3 text-lg font-semibold text-white shadow hover:bg-blue-700 transition"
            >
              <MdOutlineAssessment className="mr-2 text-2xl" />
              Check ATS Score
            </Link>
            <Link
              to="/Addresume"
              aria-label="Build your resume"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white text-blue-700 px-7 py-3 text-lg font-semibold shadow-sm hover:bg-blue-50 hover:border-blue-200 transition"
            >
              <IoRocketSharp className="mr-2 text-xl" />
              Build Resume
            </Link>
          </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-extrabold text-blue-700 mb-12">Features</h3>
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
              className="bg-gray-50 p-8 rounded-xl flex flex-col items-center shadow border border-gray-100 hover:shadow-md hover:scale-105 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-blue-500 text-4xl mb-4">{icon}</span>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
              <p className="text-gray-600 text-base">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className="relative z-10 py-16 text-center px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-block bg-gray-50 p-4 rounded-full shadow border border-gray-200 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L3 12l6.75-5M14.25 7l6.75 5-6.75 5" />
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold text-blue-700">What We Do</h3>
            <p className="text-gray-600 mt-2 text-lg font-normal">
              Empowering you to stand out in your job search with smart, AI-driven tools.
            </p>
          </motion.div>
          <motion.article
            className="bg-gray-50 rounded-xl shadow p-10 text-gray-700 text-left space-y-6 text-lg border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              We combine the power of <span className="font-semibold text-blue-600">AI technology</span> and sleek design to help job seekers build
              modern, professional resumes in minutes. Our platform not only helps you generate a resume with smart suggestions,
              but also includes an <span className="font-semibold text-blue-500">ATS score checker</span> to analyze and improve your resume’s compatibility
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
      <section className="relative z-10 py-16 text-center px-4">
        <h3 className="text-3xl font-extrabold text-blue-700 mb-12">What Our Users Say</h3>
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
              className="bg-gray-50 p-8 rounded-xl text-gray-700 border border-gray-100 shadow flex flex-col justify-between min-h-[220px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="italic text-base">“{quote}”</p>
              <p className="mt-6 font-semibold text-blue-600">{name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-16 text-center px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-white border border-gray-200 rounded-full px-7 py-3 shadow mb-6">
            <span className="text-blue-700 font-bold text-lg tracking-wide flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10.185 2.073a1 1 0 0 1 1.63 0l6.504 8.84A1 1 0 0 1 17.504 12H2.496a1 1 0 0 1-.815-1.087l6.504-8.84ZM10 4.662 4.593 11h10.814L10 4.662ZM2 13a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z"/></svg>
              Supercharge Your Career!
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6 tracking-tight">
            Ready to Build Your Resume?
          </h3>
          <p className="text-md text-gray-600 mb-10 max-w-xl mx-auto font-normal">
            Start your journey with our beautiful, AI-powered resume builder. Make your first impression count!
          </p>
          <Link
            to="/Addresume"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 px-10 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <svg className="w-7 h-7 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  );
}