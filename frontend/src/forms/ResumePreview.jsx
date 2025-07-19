import React from 'react';

export default function ResumePreview({ form, accentColor = 'purple' }) {
  // PDF-safe color mapping
  const colors = {
    purple: {
      text: 'text-[#7b1fa2]',
      border: 'border-[#7b1fa2]',
      bg: 'bg-[#e1bee7]'
    },
    blue: {
      text: 'text-[#1976d2]',
      border: 'border-[#1976d2]',
      bg: 'bg-[#bbdefb]'
    },
    red: {
      text: 'text-[#d32f2f]',
      border: 'border-[#d32f2f]',
      bg: 'bg-[#ffcdd2]'
    },
    green: {
      text: 'text-[#388e3c]',
      border: 'border-[#388e3c]',
      bg: 'bg-[#c8e6c9]'
    }
  };

  const color = colors[accentColor] || colors.purple;

  // Ensure skills is always an array
  let skillsArray = [];
  if (Array.isArray(form.skills)) {
    skillsArray = form.skills;
  } else if (typeof form.skills === "string" && form.skills.trim() !== "") {
    skillsArray = form.skills.split(",").map(s => s.trim()).filter(Boolean);
  }

  return (
    <div className={`w-full max-w-3xl mx-auto bg-white rounded-lg p-6 border ${color.border} text-gray-800 space-y-6 print:p-4 print:border-0 print:shadow-none print:max-w-full`}>
      {/* Personal Info */}
      <div className="text-center border-b border-gray-300 pb-4 print:border-b-2 print:border-black">
        <h1 className={`text-3xl font-bold ${color.text} print:text-2xl`}>
          {form.personal?.name || 'Your Name'}
        </h1>
        <h2 className="text-xl font-medium text-gray-600 mt-1 print:text-lg">
          {form.personal?.job_title || 'Your Job Title'}
        </h2>
        <div className="text-sm text-gray-600 mt-2 flex flex-wrap justify-center gap-2 print:text-black">
          <span>{form.personal?.email || 'your.email@example.com'}</span>
          <span>•</span>
          <span>{form.personal?.phone || '+1 234 567 8900'}</span>
          {form.personal?.github && (
            <>
              <span>•</span>
              <span>GitHub: {form.personal.github}</span>
            </>
          )}
          {form.personal?.linkedin && (
            <>
              <span>•</span>
              <span>LinkedIn: {form.personal.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {form.summary && (
        <section className="print:break-inside-avoid">
          <h3 className={`text-lg font-semibold ${color.text} mb-2 border-b ${color.border} pb-1 print:text-base`}>
            SUMMARY
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap print:text-sm">
            {form.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skillsArray.length > 0 && (
        <section className="print:break-inside-avoid">
          <h3 className={`text-lg font-semibold ${color.text} mb-2 border-b ${color.border} pb-1 print:text-base`}>
            SKILLS
          </h3>
          <div className="flex flex-wrap gap-2 mt-2 print:text-sm">
            {skillsArray.map((skill, index) => (
              <span 
                key={index} 
                className={`px-3 py-1 rounded-full text-sm ${color.bg} ${color.text}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {form.experience?.length > 0 && (
        <section className="print:break-inside-avoid">
          <h3 className={`text-lg font-semibold ${color.text} mb-2 border-b ${color.border} pb-1 print:text-base`}>
            EXPERIENCE
          </h3>
          <div className="space-y-4 mt-2">
            {form.experience.map((job, index) => (
              <div key={index} className="print:text-sm">
                <div className="flex justify-between">
                  <strong className="text-gray-800">{job.title || 'Job Title'}</strong>
                  <span className="text-gray-500">
                    {job.start_date || 'Start'} - {job.currentlyWorking ? 'Present' : (job.end_date || 'End')}
                  </span>
                </div>
                <div className="text-gray-700 italic">
                  at {job.company || 'Company Name'}
                  {job.location && `, ${job.location}`}
                </div>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                  {job.description || 'No description provided.'}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {form.projects?.length > 0 && (
        <section className="print:break-inside-avoid">
          <h3 className={`text-lg font-semibold ${color.text} mb-2 border-b ${color.border} pb-1 print:text-base`}>
            PROJECTS
          </h3>
          <div className="space-y-4 mt-2">
            {form.projects.map((project, index) => (
              <div key={index} className="print:text-sm">
                <div className="flex justify-between">
                  <strong className="text-gray-800">{project.title || "Project Title"}</strong>
                  <span className="text-gray-500">
                    {project.start_date || 'Start'} - {project.end_date || 'End'}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">
                  {project.description || 'No description provided.'}
                </p>
                {project.technologies && (
                  <p className="text-gray-600 mt-1">
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {form.education?.length > 0 && (
        <section className="print:break-inside-avoid">
          <h3 className={`text-lg font-semibold ${color.text} mb-2 border-b ${color.border} pb-1 print:text-base`}>
            EDUCATION
          </h3>
          <div className="space-y-4 mt-2">
            {form.education.map((edu, index) => (
              <div key={index} className="print:text-sm">
                <div className="flex justify-between">
                  <strong className="text-gray-800">{edu.degree || 'Degree Name'}</strong>
                  <span className="text-gray-500">
                    {edu.start_date || 'Start'} - {edu.currentlyStudying ? 'Present' : (edu.end_date || 'End')}
                  </span>
                </div>
                <div className="text-gray-700">
                  {edu.institution || 'Institution Name'}
                  {edu.location && `, ${edu.location}`}
                  {edu.grade && ` • ${edu.grade}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}