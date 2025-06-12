import { useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)

  const handleAddResume = () => navigate('/Addresume')

  const handleViewResume = (id) => {
    navigate(`resume/update/${id}`)
  }

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('http://127.0.0.1:8000/resume/list', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setResumes(data)
        }
      } catch (error) {
        console.error("Error fetching resumes:", error)
      }
      setLoading(false)
    }
    fetchResumes()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0f172a] via-[#5a189a] to-[#4f46e5] px-6 pt-16 pb-16 relative">
  <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-indigo-300 to-purple-100 drop-shadow mb-12 tracking-tight text-center">
    Your Resumes
  </h1>

  <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 mb-12">
    {/* Add Resume Card */}
    <div
      onClick={handleAddResume}
      className="cursor-pointer flex-1 min-w-[260px] h-44 rounded-2xl border-2 border-dashed border-purple-300 bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white hover:border-purple-500 hover:bg-white/20 transition duration-300 shadow-lg"
    >
      <FaPlus size={44} className="text-purple-300 mb-2" />
      <span className="mt-1 text-lg font-semibold">Add New Resume</span>
    </div>
  </div>

  <div className="w-full max-w-5xl">
    <h2 className="text-2xl font-bold text-white mb-6">Your Resumes</h2>
    {loading ? (
      <div className="flex justify-center items-center py-12">
        <span className="text-white text-lg animate-pulse">Loading...</span>
      </div>
    ) : resumes.length === 0 ? (
      <div className="text-white/80 tracking-wide text-lg text-center py-8">
        No resumes found. Start by adding a new one!
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {resumes.map((form) => (
          <div
            key={form._id}
            onClick={() => handleViewResume(form._id)}
            className="bg-gradient-to-br from-white/90 to-white/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300 border-t-4 border-purple-300 hover:border-purple-500 cursor-pointer group"
          >
            <div className="text-xl font-bold text-purple-800 mb-1 truncate group-hover:text-purple-900">
              {form.personal_details?.job_title || "No Job Title"}
            </div>
            <div className="text-gray-600 text-sm mb-2 truncate">
              📧 {form.personal_details?.email || "No Email"}
            </div>
            <div className="text-xs text-gray-400 truncate">
              {form.personal_details?.name || "No Name"}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  {/* Decorative Glow */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-gradient-to-r from-purple-400/20 via-indigo-400/10 to-purple-300/20 blur-2xl rounded-full pointer-events-none" />
</div>
  )
}
