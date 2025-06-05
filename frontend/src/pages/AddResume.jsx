import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalDetails from '../forms/PersonalDetails';
import Summary from '../forms/Summary';
import Skills from '../forms/Skills';
import Projects from '../forms/Projects';
import Experience from '../forms/Experience';
import Education from '../forms/Education';
import ResumePreview from '../forms/ResumePreview';
import ColorPicker from '../forms/ColorPicker';

const steps = [
  'personal',
  'summary',
  'skills',
  'projects',
  'experience',
  'education'
];

export default function AddResume() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      job_title: '', // corrected from job_title to job_role
      github: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    skills: [],
    projects: [],
    experience: [],
    education: [],
  });

  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [accentColor, setAccentColor] = useState('purple');

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

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
    } else if (name === 'skills' ) {
      setForm(prev => ({
        ...prev,
        skills: value.split(',').map(s => s.trim()).filter(Boolean),
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const prepareSubmitData = () => {
    return {
      user_id: "665d2f3ab59f7e1a2e0b1f99", // required field
      personal_details: form.personal, // renamed from "personal" to "personal_details"
      summary: form.summary,
      skills: form.skills,
      projects: form.projects,
      experience: form.experience,
      education: form.education,
    };
  };

  const handleSubmit = async () => {
    setError('');
    setMessage('');

    const submitData = prepareSubmitData();

    try {
      const response = await fetch('http://127.0.0.1:8000/resume/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const data = await response.json();
        if (Array.isArray(data.detail)) {
          const errorMessages = data.detail
            .map((err) => `${err.loc.join(' > ')}: ${err.msg}`)
            .join('; ');
          setError(errorMessages);
        } else {
          setError(data.detail || 'Resume add failed');
        }
      } else {
        const data = await response.json();
        setMessage("Resume added successfully! Your resume ID is: " + data.id);
        navigate("/dashboard/resumes");
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const renderStep = () => {
    switch (steps[step]) {
      case 'personal':
        return <PersonalDetails form={form.personal} onChange={handleChange} />;
      case 'summary':
        return <Summary form={form} onChange={handleChange} />;
      case 'skills':
        return <Skills form={form} onChange={handleChange} />;
      case 'projects':
        return <Projects form={form} onChange={handleChange} />;
      case 'experience':
        return <Experience form={form} onChange={handleChange} />;
      case 'education':
        return <Education form={form} onChange={handleChange} />;
      default:
        return null;
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
      purple: 'bg-purple-600 hover:bg-purple-700',
      blue: 'bg-blue-600 hover:bg-blue-700',
      red: 'bg-red-600 hover:bg-red-700',
      green: 'bg-green-600 hover:bg-green-700',
    };
    return colorMap[accentColor] || colorMap.purple;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 md:p-10 gap-6 md:gap-10 max-w-8xl mx-auto">
      {/* Left: Resume Live Preview */}
      <div className="flex-1">
        <ResumePreview form={form} accentColor={accentColor} />
      </div>

      {/* Right: Form + Controls */}
      <div className={`flex-1 p-6 rounded-xl border-2 ${getBorderColorClass()} bg-white/10 backdrop-blur-md`}>
        <ColorPicker accentColor={accentColor} setAccentColor={setAccentColor} />

        <div className="my-4 text-black">{renderStep()}</div>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {message && <p className="text-green-600 mb-2">{message}</p>}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {step === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Resume
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`${getButtonColorClass()} text-white px-4 py-2 rounded`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
