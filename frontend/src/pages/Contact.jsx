import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle sending the form data to your backend or email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0a1f5c] to-[#5a189a] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-300"
      >
        {/* Decorative Top Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-16 bg-gradient-to-r from-purple-400/40 via-indigo-400/30 to-purple-300/30 blur-2xl rounded-full pointer-events-none" />
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/30 shadow animate-pulse-slow">
            <FaRegPaperPlane className="text-purple-400 text-2xl" />
            <span className="font-bold text-lg text-purple-700 tracking-wide">Contact Us</span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-400 drop-shadow-lg">
            We'd Love To Hear From You
          </h2>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Have questions, feedback, or need support? Fill out the form below and our team will get back to you soon!
          </p>
        </div>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-green-700 font-bold gap-2 py-16"
          >
            <FaRegPaperPlane className="text-5xl text-green-400 mb-2 animate-bounce" />
            Thank you for contacting us!
          </motion.div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border-2 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 bg-white transition shadow-sm"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border-2 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 bg-white transition shadow-sm"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border-2 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 bg-white transition shadow-sm"
                placeholder="Type your message here..."
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 text-white font-semibold text-lg py-3 rounded-xl shadow-lg hover:scale-105 hover:from-purple-700 hover:to-indigo-800 transition-all"
            >
              <FaRegPaperPlane className="text-2xl" />
              Send Message
            </button>
          </form>
        )}
        {/* Decorative Bottom Glow */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-2/3 h-12 bg-gradient-to-r from-purple-400/20 via-indigo-400/10 to-purple-300/20 blur-2xl rounded-full pointer-events-none" />
        <style>{`
          @keyframes pulse-slow { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.35; } }
          .animate-pulse-slow { animation: pulse-slow 6s infinite; }
        `}</style>
      </motion.div>
    </div>
  );
}