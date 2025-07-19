import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "../forms/ResumePreview";

export default function ResumePreviewPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const BACK_URL = import.meta.env.VITE_FAST_BACKEND_URL;

  // Ref for printable area
  const printRef = useRef();

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BACK_URL}/resume/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setForm({
          personal: data.personal_details || {},
          summary: data.summary || "",
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
          projects: data.projects || [],
          experience: data.experience || [],
          education: data.education || [],
        });
      }
    };
    if (id && id !== "undefined") {
      fetchResume();
    }
  }, [id, BACK_URL]);

  // react-to-print hook
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${form?.personal?.name || "Resume"}_Resume`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print { body { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; } }
    `,
  });

  if (!form) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#ede9fe] via-[#f3e8ff] to-[#c7d2fe]">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-5 border border-purple-500 text-black my-8">
        {/* Printable area */}
        <div ref={printRef}>
          <ResumePreview form={form} accentColor="purple" />
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 rounded-md bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow hover:from-purple-700 hover:to-indigo-800 transition"
      >
        Download Resume as PDF
      </button>
    </div>
  );
}