import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUpload, FiFileText, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

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
          stroke="#e9d5ff"
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
      alert('Please upload a PDF resume and enter a job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('job_description', jobDescription);
    const BACK_URL = import.meta.env.VITE_FAST_BACKEND_URL;

    try {
      setLoading(true);
      const response = await axios.post(`${BACK_URL}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      const message = error.response?.data?.detail || "An error occurred while analyzing the resume.";
      alert(message);
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] py-10 text-white">

    

      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-200">Resume Analyzer</h1>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <label className="block text-lg font-medium text-purple-100 mb-3">
              <FiFileText className="inline mr-2" />
              Upload Your Resume
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-purple-300 rounded-lg hover:bg-white/5 transition">
                  <FiUpload className="text-xl mr-2 text-purple-200" />
                  <span className="text-purple-200">
                    {selectedFile ? selectedFile.name : 'Choose PDF file'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <label className="block text-lg font-medium text-purple-100 mb-3">
              Job Description
            </label>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={handleDescriptionChange}
              placeholder="Paste the job description here..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>

          {/* Results Section */}
          {result && (
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-6">
              <h2 className="text-2xl font-bold text-purple-100 border-b border-white/10 pb-3">
                Analysis Results
              </h2>

              <div className="text-center">
                <CircularScore score={parseInt(result['JD Match'])} />
                <p className="text-purple-200 mt-2">Match Score</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-100 mb-2">Profile Summary</h3>
                <p className="text-white/90 whitespace-pre-line">
                  {result['Profile Summary']}
                </p>
              </div>

              {result['Missing Keywords']?.length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium text-purple-100 mb-2 flex items-center">
                    <FiAlertTriangle className="mr-2 text-yellow-400" />
                    Missing Keywords
                  </h3>
                  <ul className="space-y-2">
                    {result['Missing Keywords'].map((keyword, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 mr-2">•</span>
                        <span className="text-white/90">{keyword}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center hover:opacity-90 transition"
                  >
                    
                    Improve with AI
                  </button>
                </div>
              ) : (
                <div className="flex items-center text-green-400">
                  <FiCheckCircle className="mr-2" />
                  No missing keywords found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScorePage;