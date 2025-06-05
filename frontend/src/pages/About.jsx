import { FaBrain, FaFilePdf, FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlinePreview, MdFormatListBulleted, MdLeaderboard } from "react-icons/md";
import { GiTargetShot, GiCrystalBall } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-[#0D0D0D] text-white py-16 px-6 md:px-20 space-y-16">
      {/* Section 1: Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-purple-500">About ResumeGenius AI</h1>
        <p className="text-lg text-gray-300">
          Your career companion powered by Artificial Intelligence. Build stunning, ATS-optimized resumes effortlessly.
        </p>
      </section>

      {/* Section 2: Mission */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
            <GiTargetShot className="text-purple-400 text-3xl" />
            Our Mission
          </h2>
          <p className="text-gray-300">
            We're here to help every job seeker unlock their potential by crafting smart, personalized, and visually appealing resumes.
            Using cutting-edge AI, we simplify the resume building process while boosting your chances of landing interviews.
          </p>
        </div>
        <GiTargetShot className="text-purple-400 text-[100px] mx-auto" />
      </section>

      {/* Section 3: Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-purple-400 text-center">🚀 What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "AI-Powered Resume Builder",
              desc: "Generate personalized resumes tailored to your job role using AI.",
              icon: <FaBrain className="text-3xl text-purple-500" />,
            },
            {
              title: "ATS Score Checker",
              desc: "Check how well your resume ranks for a specific job description.",
              icon: <MdLeaderboard className="text-3xl text-purple-500" />,
            },
            {
              title: "Live Resume Preview",
              desc: "See real-time changes and visualize your resume as you build it.",
              icon: <MdOutlinePreview className="text-3xl text-purple-500" />,
            },
            {
              title: "Beautiful Templates",
              desc: "Choose from modern, recruiter-friendly templates with clean design.",
              icon: <MdFormatListBulleted className="text-3xl text-purple-500" />,
            },
            {
              title: "One-Click PDF Download",
              desc: "Easily export your resume in high-quality PDF format.",
              icon: <FaFilePdf className="text-3xl text-purple-500" />,
            },
            {
              title: "Secure Cloud Storage",
              desc: "Keep your resume safe and access it anytime, anywhere.",
              icon: <FaCloudUploadAlt className="text-3xl text-purple-500" />,
            },
          ].map((feature, i) => (
            <div key={i} className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-700 shadow-md hover:border-purple-600 transition">
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Vision */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <GiCrystalBall className="text-purple-400 text-[100px] mx-auto" />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
            <GiCrystalBall className="text-purple-400 text-3xl" />
            Our Vision
          </h2>
          <p className="text-gray-300">
            We envision a future where job seekers don't struggle with resume formats, wording, or gaps. Instead, they focus on growth, while our smart system handles the rest — from formatting to optimization.
          </p>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to Create Your Dream Resume?</h2>
        <p className="text-gray-400">
          Get started with ResumeGenius AI and land your next job faster.
        </p>
        <Link 
          to={"/addResume"}
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
        >
          Start Building Now
        </Link>
      </section>
    </div>
  );
}
