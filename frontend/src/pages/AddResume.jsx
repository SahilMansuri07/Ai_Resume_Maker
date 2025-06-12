import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PersonalDetails from '../forms/PersonalDetails';
import Summary from '../forms/Summary';
import Skills from '../forms/Skills';
import Projects from '../forms/Projects';
import Experience from '../forms/Experience';
import Education from '../forms/Education';
import ResumePreview from '../forms/ResumePreview';

const steps = ['personal', 'summary', 'skills', 'projects', 'experience', 'education'];
const stepLabels = ["Personal", "Summary", "Skills", "Projects", "Experience", "Education"];

export default function AddResume() {
  const navigate = useNavigate();
  const { id: resumeIdParam } = useParams();
  const [form, setForm] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      job_title: '',
      github: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    skills: '',
    projects: [],
    experience: [],
    education: [],
  });

  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [accentColor, setAccentColor] = useState('purple');
  const [resumeId, setResumeId] = useState(resumeIdParam || '');

  useEffect(() => {
    if (resumeIdParam) {
      const fetchResume = async () => {
        try {
          console.log("Fetching resume with ID:", resumeIdParam);
          const token = localStorage.getItem('token');
          const res = await fetch(`http://127.0.0.1:8000/resume/get/${resumeIdParam}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setForm({
              personal: data.personal_details || {},
              summary: data.summary || '',
              skills: (data.skills || []).join(', '),
              projects: data.projects || [],
              experience: data.experience || [],
              education: data.education || [],
            });
            console.log("Token used:", token);
            console.log("Response status:", res.status);
          }
        } catch (err) {
          setError('Failed to fetch resume for editing');
        }
      };
      fetchResume();
    }
  }, [resumeIdParam]);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

//  const handleDownload = async () => {
//   if (!resumeId) {
//     setError("Please save your resume before downloading.");
//     return;
//   }

//   setError('');
//   setMessage('');

//   try {
//     const response = await fetch(`http://127.0.0.1:8000/resume/download/${resumeId}`, {
//       method: 'GET',
//       headers: {
//         "Authorization": `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       setError(data.detail || 'Failed to download resume');
//       return;
//     }

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `resume_${resumeId}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);
//     setMessage("Resume downloaded successfully!");
//   } catch (err) {
//     setError('Error: ' + err.message);
//   }
// };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.personal) {
      setForm(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          [name]: value,
        },
      }));
    } else if (name === 'skills') {
      setForm(prev => ({
        ...prev,
        skills: value,
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const prepareSubmitData = () => ({
    personal_details: form.personal,
    summary: form.summary,
    skills: form.skills
      ? form.skills.split(',').map(s => s.trim()).filter(Boolean)
      : [],
    projects: form.projects,
    experience: form.experience,
    education: form.education,
  });

  const handleSubmit = async () => {
    setError('');
    setMessage('');
    const submitData = prepareSubmitData();

    try {
      const endpoint = resumeId ? `http://127.0.0.1:8000/resume/update/${resumeId}` : 'http://127.0.0.1:8000/resume/add';
      const method = resumeId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          const errorMessages = data.detail.map(err => `${err.loc.join(' > ')}: ${err.msg}`).join('; ');
          setError(errorMessages);
        } else {
          setError(data.detail || 'Resume save failed');
        }
      } else {
        setMessage(resumeId ? "Resume updated successfully!" : "Resume added successfully!");
        setResumeId(data.id || resumeId);
        navigate("/dashboard/resumes");
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const renderStep = () => {
    switch (steps[step]) {
      case 'personal': return <PersonalDetails form={form.personal} onChange={handleChange} />;
      case 'summary': return <Summary form={form} onChange={handleChange} />;
      case 'skills': return <Skills form={form} onChange={handleChange} />;
      case 'projects': return <Projects form={form} onChange={handleChange} />;
      case 'experience': return <Experience form={form} onChange={handleChange} />;
      case 'education': return <Education form={form} onChange={handleChange} />;
      default: return null;
    }
  };

  const getBorderColorClass = () => {
    const colorMap = {
      purple: 'border-purple-400',
      blue: 'border-blue-400',
      red: 'border-red-400',
      green: 'border-green-400',
    };
    return colorMap[accentColor] || colorMap.purple;
  };

  const getButtonColorClass = () => {
    const colorMap = {
      purple: 'bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 hover:from-purple-700 hover:to-indigo-700',
      blue: 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-700 hover:to-cyan-700',
      red: 'bg-gradient-to-r from-red-600 via-pink-500 to-red-700 hover:from-red-700 hover:to-pink-700',
      green: 'bg-gradient-to-r from-green-600 via-lime-500 to-green-700 hover:from-green-700 hover:to-lime-700',
    };
    return colorMap[accentColor] || colorMap.purple;
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen p-2 md:p-10 gap-6 md:gap-10 max-w-8xl mx-auto bg-gradient-to-br from-[#ede9fe] via-[#f3e8ff] to-[#c7d2fe]">
      <div className={`flex-1 p-4 md:p-8 rounded-2xl border-2 shadow-xl ${getBorderColorClass()} bg-white/70 backdrop-blur-lg flex flex-col justify-between`}>
        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {stepLabels.map((label, idx) => (
              <div
                key={label}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 
                  ${step === idx ? "bg-purple-700 text-white shadow-lg scale-105" : "bg-purple-200 text-purple-800 opacity-70"}`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="my-2 text-black">{renderStep()}</div>

        {error && <p className="text-red-600 font-semibold my-2">{error}</p>}
        {message && <p className="text-green-600 font-semibold my-2">{message}</p>}

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {step === steps.length - 1 ? (
            <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
              {/* <button
                onClick={handleDownload}
                className="flex-1 rounded-lg px-6 py-2 font-semibold shadow text-white transition-all duration-200 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-700 hover:scale-105"
              >
                Download Resume
              </button> */}
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-lg px-6 py-2 font-semibold shadow text-white transition-all duration-200 bg-gradient-to-r from-green-500 via-emerald-500 to-green-700 hover:scale-105"
              >
                {resumeId ? "Update Resume" : "Save Resume"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleNext}
              className={`${getButtonColorClass()} text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-all duration-200`}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-transparent">
        <div className="w-full max-w-5xl">
          <ResumePreview form={form} accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
}
