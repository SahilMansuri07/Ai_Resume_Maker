import { FaBrain, FaFilePdf, FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlinePreview, MdFormatListBulleted, MdLeaderboard } from "react-icons/md";
import { GiTargetShot, GiCrystalBall } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="bg-[#ede9e3] text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-16 pb-12 sm:pt-24 sm:pb-20 space-y-6">
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-gray-50 rounded-full shadow-sm border border-gray-200 justify-center">
          <FaBrain className="text-blue-600 text-2xl" />
          <span className="text-blue-700 font-semibold tracking-wide text-lg">About ResumeGenie AI</span>
        </div>
        <h1 className="text-[clamp(1.6rem,3.2vw,2.7rem)] font-extrabold leading-tight">
          Your AI-powered career companion
        </h1>
        <p className="mt-2 text-lg text-gray-600 font-normal">
          Build beautiful, ATS-optimized resumes quickly and confidently with the help of artificial intelligence.
        </p>
      </section>

      {/* Mission */}
      <section className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
            <GiTargetShot className="text-blue-400 text-3xl" />
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg">
            We're here to help everyone unlock their potential with smart, personalized, and stunning resumes.<br/>
            Our AI makes building and optimizing your resume simple, boosting your chances of landing interviews at top companies.
          </p>
        </div>
        <GiTargetShot className="text-blue-400 text-[100px] mx-auto hidden md:block" />
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto space-y-10">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-12 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Resume Builder",
              desc: "Generate tailored resumes for your dream job using intelligent suggestions.",
              icon: <FaBrain className="text-3xl text-blue-500" />,
            },
            {
              title: "ATS Score Checker",
              desc: "See how your resume performs with Applicant Tracking Systems.",
              icon: <MdLeaderboard className="text-3xl text-blue-500" />,
            },
            {
              title: "Live Resume Preview",
              desc: "Visualize changes in real-time as you customize your content.",
              icon: <MdOutlinePreview className="text-3xl text-blue-500" />,
            },
            {
              title: "Modern Templates",
              desc: "Choose from clean, professional templates designed to stand out.",
              icon: <MdFormatListBulleted className="text-3xl text-blue-500" />,
            },
            {
              title: "One-Click PDF Download",
              desc: "Export your polished resume instantly in high-quality PDF format.",
              icon: <FaFilePdf className="text-3xl text-blue-500" />,
            },
            {
              title: "Secure Cloud Storage",
              desc: "Access your resume securely from any device, anytime.",
              icon: <FaCloudUploadAlt className="text-3xl text-blue-500" />,
            },
          ].map((feature, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow hover:shadow-md hover:scale-105 transition flex flex-col items-center space-y-3">
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-base text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto py-8 px-4">
        <GiCrystalBall className="text-blue-400 text-[100px] mx-auto hidden md:block" />
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
            <GiCrystalBall className="text-blue-400 text-3xl" />
            Our Vision
          </h2>
          <p className="text-gray-600 text-lg">
            We envision a future where job hunters thrive on growth and opportunity, not formatting struggles.
            Let our smart system handle the details—so you can focus on your career!
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 text-center px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-white border border-gray-200 rounded-full px-7 py-3 shadow mb-6">
            <span className="text-blue-700 font-bold text-lg tracking-wide flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10.185 2.073a1 1 0 0 1 1.63 0l6.504 8.84A1 1 0 0 1 17.504 12H2.496a1 1 0 0 1-.815-1.087l6.504-8.84ZM10 4.662 4.593 11h10.814L10 4.662ZM2 13a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z"/></svg>
              Ready to Create Your Dream Resume?
            </span>
          </div>
          <p className="text-md text-gray-600 mb-10 max-w-xl mx-auto font-normal">
            Get started with ResumeGenie AI and take the next step in your career journey.
          </p>
          <Link 
            to={"/addResume"}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 px-10 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <svg className="w-7 h-7 text-white mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Start Building Now
          </Link>
        </div>
      </section>
    </main>
  );
}