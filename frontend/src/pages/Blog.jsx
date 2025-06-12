import { Link } from "react-router-dom";

export default function Blog() {
  // Example blog posts data (replace with your real data or fetch from API)
  const posts = [
    {
      id: 1,
      title: "How AI is Revolutionizing Resume Building",
      date: "June 10, 2025",
      author: "Sahil Mansuri",
      excerpt: "Discover how artificial intelligence is transforming the way job seekers create and optimize their resumes for the modern job market.",
      image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?fit=crop&w=600&q=80",
      link: "/blog/ai-in-resume-building"
    },
    {
      id: 2,
      title: "5 ATS Tips to Get Your Resume Noticed",
      date: "May 25, 2025",
      author: "Priya Desai",
      excerpt: "Learn the top five strategies to ensure your resume passes Applicant Tracking Systems and lands in the hands of recruiters.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80",
      link: "/blog/ats-tips"
    },
    {
      id: 3,
      title: "Resume Templates: Which Design Fits Your Career?",
      date: "May 5, 2025",
      author: "Rahul Mehta",
      excerpt: "Explore various resume templates and find out which style best aligns with your industry and career goals.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?fit=crop&w=600&q=80",
      link: "/blog/resume-templates"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a1f5c] to-[#5a189a] py-16 px-4">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-100 drop-shadow mb-4">
          ResumeGenie AI Blog
        </h1>
        <p className="text-lg text-white/80">
          Insights, tips, and updates to help you build your best resume and boost your career.
        </p>
      </section>
      {/* Blog Posts */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={post.link}
            className="group bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-purple-500 transition-all duration-200 flex flex-col"
          >
            <div className="h-52 w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between px-6 py-6">
              <div>
                <h2 className="text-2xl font-bold text-purple-200 group-hover:text-purple-300 mb-2">{post.title}</h2>
                <div className="flex items-center text-xs text-white/60 mb-3 gap-2">
                  <span>{post.date}</span>
                  <span className="mx-1">•</span>
                  <span>by {post.author}</span>
                </div>
                <p className="text-white/80 mb-4">{post.excerpt}</p>
              </div>
              <span className="inline-block mt-auto text-purple-300 font-semibold group-hover:underline group-hover:text-purple-200 transition">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </section>
      {/* Decorative Gradient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-gradient-to-r from-purple-400/20 via-indigo-400/10 to-purple-300/20 blur-2xl rounded-full pointer-events-none" />
    </main>
  );
}