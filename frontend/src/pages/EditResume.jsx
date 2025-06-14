import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ResumePreview from '../forms/ResumePreview'

export default function EditResume() {
  const { id } = useParams()
  const [resume, setResume] = useState(null)

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem('token')
       const BACK_URL = import.meta.env.VITE_FAST_BACKEND_URL;
      const res = await fetch(`${BACK_URL}/resume/update/{resume_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setResume(data)
      }
    }
    fetchResume()
  }, [id])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {resume ? (
        <ResumePreview form={resume} />
      ) : (
        <p>Loading resume...</p>
      )}
    </div>
  )
}
