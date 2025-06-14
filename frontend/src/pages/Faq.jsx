import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: "What is ResumeGenie AI?",
    answer:
      "ResumeGenie AI is an advanced platform that helps you create, analyze, and optimize professional resumes using cutting-edge artificial intelligence. It offers personalized summaries, ATS tips, and beautiful templates to boost your job search."
  },
  {
    question: "How do I create a new resume?",
    answer:
      "Click on the 'Add New Resume' button on your dashboard, fill out the guided form, and preview your resume live. You can save, download, and edit your resume at any time."
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes! After saving your resume, you can download it in PDF format from your dashboard with a single click."
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use secure authentication and encrypted storage to protect your information. Your data is never shared without your consent."
  },
  {
    question: "How does the AI summary work?",
    answer:
      "Our AI generates tailored professional summaries based on your job title and experience, following industry best practices and using impactful keywords."
  },
  {
    question: "Can I edit or update my resume later?",
    answer:
      "Yes, you can edit any part of your saved resumes at any time from your dashboard. The changes will be reflected immediately."
  },
  {
    question: "Do you provide tips for ATS optimization?",
    answer:
      "Yes, our platform analyzes your resume against job descriptions and provides actionable tips to improve your ATS compatibility and visibility."
  },
  {
    question: "How can I give feedback or report an issue?",
    answer:
      "You can use our Feedback page to rate your experience and share suggestions, or contact us directly via the support section."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = idx => {
    setOpenIndex(idx === openIndex ? null : idx);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#ede9fe] via-[#f3e8ff] to-[#c7d2fe] px-4 py-16 relative">
      <div className="w-full max-w-3xl bg-white/80 rounded-3xl shadow-2xl p-8 backdrop-blur-lg border-t-4 border-purple-300 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 mb-6 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div key={idx} className="rounded-xl bg-white/90 border border-purple-100 shadow transition">
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              >
                <span className="font-bold text-purple-800 text-lg">{faq.question}</span>
                {openIndex === idx ? (
                  <FaChevronUp className="text-purple-500" />
                ) : (
                  <FaChevronDown className="text-purple-400" />
                )}
              </button>
              {openIndex === idx && (
                <div className="px-4 pb-4 text-gray-700 text-base animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-gradient-to-r from-purple-400/20 via-indigo-400/10 to-purple-300/20 blur-2xl rounded-full pointer-events-none" />
    </div>
  );
}