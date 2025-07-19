import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import PersonalDetails from '../forms/PersonalDetails';
import Summary from '../forms/Summary';
import Skills from '../forms/Skills';
import Projects from '../forms/Projects';
import Experience from '../forms/Experience';
import Education from '../forms/Education';
import ResumePreview from '../forms/ResumePreview';
import Modal from '../components/common/Modal';

const steps = ['personal', 'summary', 'skills', 'projects', 'experience', 'education'];
const stepLabels = ["Personal", "Summary", "Skills", "Projects", "Experience", "Education"];

export default function AddResume() {
  const navigate = useNavigate();
  const { id: resumeIdParam } = useParams();
  const { toPDF, targetRef } = usePDF({ 
    filename: 'resume.pdf',
    page: {
      margin: 10
    }
  });

  const [form, setForm] = useState({
    personal: { name: '', email: '', phone: '', job_title: '', github: '', linkedin: '', portfolio: '' },
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
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const BACK_URL = import.meta.env.VITE_FAST_BACKEND_URL;

  useEffect(() => {
    if (resumeIdParam) {
      const fetchResume = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${BACK_URL}/resume/get/${resumeIdParam}`, {
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
          }
        } catch (err) {
          setError('Failed to fetch resume for editing');
        }
      };
      fetchResume();
    }
  }, [resumeIdParam, BACK_URL]);

  const handleNext = () => { if (step < steps.length - 1) setStep(step + 1); };
  const handleBack = () => { if (step > 0) setStep(step - 1); };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.personal) {
      setForm(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
    } else if (name === 'skills') {
      setForm(prev => ({ ...prev, skills: value }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const prepareSubmitData = () => ({
    personal_details: form.personal,
    summary: form.summary,
    skills: form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
    projects: form.projects,
    experience: form.experience,
    education: form.education,
  });

  const handleSubmit = async () => {
    setError('');
    setMessage('');
    const submitData = prepareSubmitData();
    try {
      const endpoint = resumeId ? `${BACK_URL}/resume/update/${resumeId}` : `${BACK_URL}/resume/add`;
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
        setShowPreviewButton(false);
      } else {
        setMessage(resumeId ? "Resume updated successfully!" : "Resume added successfully!");
        const newId = data.id || resumeId;
        setResumeId(newId);
        setShowPreviewButton(true);
      }
    } catch (err) {
      setError('Error: ' + err.message);
      setShowPreviewButton(false);
    }
  };

  const handleDownloadPDF = () => {
    setTimeout(() => {
      toPDF();
    }, 100);
  };

  const getBorderColorClass = () => {
    const colorMap = { 
      purple: 'border-[#9c27b0]', 
      blue: 'border-[#2196f3]', 
      red: 'border-[#f44336]', 
      green: 'border-[#4caf50]' 
    };
    return colorMap[accentColor] || colorMap.purple;
  };

  const getButtonColorClass = () => {
    const colorMap = {
      purple: 'bg-[#9c27b0] hover:bg-[#7b1fa2]',
      blue: 'bg-[#2196f3] hover:bg-[#1976d2]',
      red: 'bg-[#f44336] hover:bg-[#d32f2f]',
      green: 'bg-[#4caf50] hover:bg-[#388e3c]',
    };
    return colorMap[accentColor] || colorMap.purple;
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

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen p-2 md:p-10 gap-6 md:gap-10 max-w-8xl mx-auto bg-gray-50">
      <div className={`flex-1 p-4 md:p-8 rounded-2xl border-2 ${getBorderColorClass()} bg-white flex flex-col justify-between`}>
        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {stepLabels.map((label, idx) => (
              <div
                key={label}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 
                  ${step === idx ? "bg-[#9c27b0] text-white shadow-lg scale-105" : "bg-[#e1bee7] text-[#7b1fa2] opacity-70"}`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="my-2 text-black">{renderStep()}</div>
        {error && <p className="text-[#d32f2f] font-semibold my-2">{error}</p>}
        {message && <p className="text-[#388e3c] font-semibold my-2">{message}</p>}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="bg-[#e0e0e0] text-[#212121] px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#bdbdbd] disabled:opacity-50"
          >
            Previous
          </button>
          {step === steps.length - 1 ? (
            <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-lg px-6 py-2 font-semibold shadow text-white transition-all duration-200 bg-[#388e3c] hover:bg-[#2e7d32]"
              >
                {resumeId ? "Update Resume" : "Save Resume"}
              </button>
              {showPreviewButton && resumeId && (
                <button
                  type="button"
                  className="flex-1 rounded-lg px-6 py-2 font-semibold shadow text-white transition-all duration-200 bg-[#9c27b0] hover:bg-[#7b1fa2]"
                  onClick={() => setShowPreviewModal(true)}
                >
                  Preview Resume
                </button>
              )}
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
      <div className="flex-1 flex items-center justify-center bg-transparent print:hidden">
        <div className="w-full max-w-5xl">
          <ResumePreview form={form} accentColor={accentColor} />
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <Modal onClose={() => setShowPreviewModal(false)}>
          <div className="w-full max-w-4xl max-h-[90vh] overflow-auto p-4" ref={targetRef}>
            <ResumePreview form={form} accentColor={accentColor} />
          </div>
          <div className="mt-4 flex justify-end gap-2 print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-[#2196f3] text-white rounded hover:bg-[#1976d2]"
            >
              Download PDF
            </button>
            <button
              onClick={() => setShowPreviewModal(false)}
              className="px-4 py-2 bg-[#9c27b0] text-white rounded hover:bg-[#7b1fa2]"
            >
              Close Preview
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}