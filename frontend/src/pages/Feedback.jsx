import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const demoFeedbacks = [
  {
    name: "Priya Desai",
    rating: 5,
    feedback: "ResumeGenie AI made my job search so much easier. The AI summaries are spot-on and the design is beautiful!",
    date: "2025-06-10"
  },
  {
    name: "Rahul Mehta",
    rating: 4,
    feedback: "I loved the seamless experience and how quickly I could build a professional resume. Would recommend to friends.",
    date: "2025-06-08"
  },
  {
    name: "Aisha Khan",
    rating: 5,
    feedback: "The feedback and score features are really helpful. I landed an interview within a week!",
    date: "2025-06-06"
  }
];

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  // For demo, prepend new feedbacks here
  const [feedbacks, setFeedbacks] = useState(demoFeedbacks);

  const handleStarClick = (index) => setRating(index);
  const handleStarHover = (index) => setHovered(index);
  const handleStarLeave = () => setHovered(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim() || !rating) {
      setMessage('Please give a rating and write your feedback.');
      return;
    }
    // In real scenario, send to backend
    setFeedbacks([
      {
        name: "Anonymous User",
        rating,
        feedback,
        date: new Date().toISOString().slice(0, 10)
      },
      ...feedbacks,
    ]);
    setMessage('Thank you for your feedback! 🌟');
    setFeedback('');
    setRating(0);
    setHovered(0);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ede9fe] via-[#f3e8ff] to-[#c7d2fe] px-4 py-16">
      <div className="w-full max-w-lg bg-white/80 rounded-3xl shadow-2xl p-8 backdrop-blur-lg border-t-4 border-purple-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 mb-2 text-center">
          We Value Your Feedback
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Help us improve ResumeGenie AI by sharing your thoughts or rating your experience.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* Rating */}
          <div className="flex items-center mb-5">
            {[1,2,3,4,5].map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => handleStarClick(i)}
                onMouseEnter={() => handleStarHover(i)}
                onMouseLeave={handleStarLeave}
                className="focus:outline-none"
                aria-label={`Rate ${i} star${i>1?'s':''}`}
              >
                <FaStar
                  size={32}
                  className={`transition-colors duration-200 ${
                    (hovered || rating) >= i
                      ? 'text-yellow-400 drop-shadow'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {/* Feedback Textarea */}
          <textarea
            className="w-full rounded-xl border border-purple-200 focus:border-purple-400 focus:ring focus:ring-purple-100 bg-white/90 p-4 text-gray-800 resize-none shadow mb-6"
            rows={5}
            placeholder="Share your feedback or suggestions..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg transition-all"
            disabled={!!message}
          >
            {message ? "Submitted" : "Submit Feedback"}
          </button>
          {/* Thank you message */}
          {message && (
            <div className="mt-5 text-green-600 text-center font-semibold animate-bounce">
              {message}
            </div>
          )}
        </form>
      </div>
      {/* Previous Feedbacks */}
      <div className="w-full max-w-2xl mt-12">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Recent User Feedback</h2>
        <div className="space-y-6">
          {feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="bg-white/70 rounded-2xl shadow-md p-6 border-l-4 border-purple-300 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-purple-700">{fb.name}</span>
                <span className="text-xs text-gray-400">{fb.date}</span>
              </div>
              <div className="flex items-center mb-2">
                {[1,2,3,4,5].map(i => (
                  <FaStar
                    key={i}
                    size={18}
                    className={`mr-1 ${fb.rating >= i ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <div className="text-gray-800 text-base">{fb.feedback}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-gradient-to-r from-purple-400/20 via-indigo-400/10 to-purple-300/20 blur-2xl rounded-full pointer-events-none" />
    </div>
  );
}