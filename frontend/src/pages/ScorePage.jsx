import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CircularScore = ({ score }) => {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const newOffset = circumference - (score / 100) * circumference;
    setOffset(newOffset);
  }, [score]);

  return (
    <div className="relative w-[120px] h-[120px] mx-auto mb-4">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#4c1d95"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#8b5cf6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-2xl">
        {score}%
      </span>
    </div>
  );
};

const ScorePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !jobDescription) {
      alert('Please upload a resume and enter a job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('job_description', jobDescription);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Something went wrong. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#4c1d95] px-4 py-16 text-white">
      <div className="mb-10 text-5xl font-extrabold text-purple-300">Resume Analyzer</div>

      <div className="mb-6 flex flex-col w-full max-w-3xl">
        <h2 className="text-purple-200 text-xl font-semibold mb-2">Upload Your Resume</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full cursor-pointer rounded-2xl border border-purple-300 bg-purple-100/10 p-3 text-purple-200 text-base
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:bg-purple-600 file:text-white
                     hover:file:bg-purple-700
                     file:focus:outline-none file:focus:ring-2 file:focus:ring-purple-500
                     file:cursor-pointer"
        />
      </div>

      <div className="mb-8 flex flex-col w-full max-w-3xl">
        <h2 className="text-purple-200 text-xl font-semibold mb-2">Paste Job Description</h2>
        <textarea
          rows={6}
          value={jobDescription}
          onChange={handleDescriptionChange}
          placeholder="Paste job description here..."
          className="w-full rounded-lg border border-purple-300 bg-purple-100/10 p-4 text-purple-100 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mb-10 rounded-2xl bg-purple-600 px-8 py-3 font-semibold text-white text-base shadow hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {result && (
        <div className="w-full max-w-3xl rounded-2xl bg-white/10 p-6 shadow-xl backdrop-blur-lg space-y-6 border border-purple-400">
          <h3 className="border-b border-purple-300 pb-2 text-3xl font-bold text-purple-200">Analysis Result</h3>

          <p className="mb-1 font-semibold text-xl text-purple-300">Score :</p>
          <div className="flex justify-center">
            <CircularScore score={result['JD Match']} />
          </div>

          <div>
            <p className="mb-1 font-semibold text-xl text-purple-300">Profile Summary:</p>
            <p className="whitespace-pre-line text-purple-100 text-base">{result['Profile Summary']}</p>
          </div>

          {result['Missing Keywords'] && result['Missing Keywords'].length > 0 ? (
            <div>
              <p className="mb-1 font-semibold text-xl text-purple-300">Missing Keywords:</p>
              <ul className="list-disc list-inside space-y-1 text-purple-100 text-base">
                {result['Missing Keywords'].map((keyword, index) => (
                  <li key={index}>⚠️ {keyword}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="font-semibold text-green-400 text-lg">Missing Keywords: None ✅</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScorePage;
