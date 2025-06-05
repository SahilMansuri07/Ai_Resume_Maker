import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleAddResume = () => {
    navigate('/add-resume')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 px-6 pt-16">
      <h1 className="text-4xl font-bold text-white mb-12">Resumes - Add New</h1>

      <div
        onClick={handleAddResume}
        className="cursor-pointer w-64 h-40 rounded-2xl border-2 border-dashed border-purple-300 bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white hover:border-purple-400 hover:bg-white/20 transition duration-300 shadow-lg"
      >
        <FaPlus size={40} />
        <span className="mt-3 text-lg font-semibold">Add New Resume</span>
      </div>
    </div>
  )
}
