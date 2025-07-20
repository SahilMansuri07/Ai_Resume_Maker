import React, { useState } from 'react';
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
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12 border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full">
            <FaRegPaperPlane className="text-purple-500 text-2xl" />
            <span className="font-bold text-lg text-purple-700">Contact Us</span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-800">
            We'd Love To Hear From You
          </h2>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Have questions ? Fill out the form below.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center text-green-700 font-bold gap-2 py-16">
            <FaRegPaperPlane className="text-5xl text-green-500 mb-2" />
            Thank you for contacting us!
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                placeholder="Type your message here..."
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold text-lg py-3 rounded-lg hover:bg-purple-700"
            >
              <FaRegPaperPlane className="text-xl" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}