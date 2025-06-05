import React from 'react';

export default function ResumePreview({ form, accentColor = 'purple' }) {
    console.log('Current form data:', form);
  const getColorClasses = () => {
    const colorMap = {
      purple: {
        border: 'border-purple-500',
        text: 'text-purple-700',
      },
      blue: {
        border: 'border-blue-500',
        text: 'text-blue-700',
      },
      red: {
        border: 'border-red-500',
        text: 'text-red-700',
      },
      green: {
        border: 'border-green-500',
        text: 'text-green-700',
      },
    };
    return colorMap[accentColor] || colorMap.purple;
  };

  const colors = getColorClasses();

  return (
    <div className={`flex-1 bg-white rounded-xl shadow-lg p-5 border ${colors.border} text-black space-y-6`}>
      {/* Personal Info */}
      <div className="text-center border-b pb-4">
        <h1 className={`text-4xl font-extrabold ${colors.text}`}>{form.personal?.name || 'Your Name'}</h1>
        <h2 className="text-xl font-medium text-gray-600 mt-1">{form.personal?.job_title || 'Your Job Title'}</h2>
        <div className="text-sm text-gray-500 mt-2 flex flex-wrap justify-center gap-2">
          <span>{form.personal?.email || 'your.email@example.com'}</span>
          {form.personal?.email && form.personal?.phone && <span>|</span>}
          <span>{form.personal?.phone || '+1 234 567 8900'}</span>
        </div>
        {(form.personal?.github || form.personal?.linkedin || form.personal?.portfolio) && (
          <div className="text-sm text-gray-500 mt-2 flex flex-wrap justify-center gap-2">
            {form.personal?.github && <span>GitHub: {form.personal.github}</span>}
            {form.personal?.github && form.personal?.linkedin && <span>|</span>}
            {form.personal?.linkedin && <span>LinkedIn: {form.personal.linkedin}</span>}
            {form.personal?.linkedin && form.personal?.portfolio && <span>|</span>}
            {form.personal?.portfolio && <span>Portfolio: {form.personal.portfolio}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {form.summary && (
        <>
          <section>
            <h3 className={`text-lg font-semibold ${colors.text} mb-2`}>📝 Summary</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{form.summary || "summary add"}</p>
          </section>
          <hr className="border-t border-gray-300" />
        </>
      )}

      {/* Skills */}
      {form.skills && form.skills.length > 0 && (
        <>
          <section>
            <h3 className={`text-lg font-semibold ${colors.text} mb-2`}>🛠️ Skills</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {form.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
          <hr className="border-t border-gray-300" />
        </>
      )}

      {/* Projects */}
      {/* Projects */}
{form.projects && form.projects.length > 0 && (
  <>
    <section>
      <h3 className={`text-lg font-semibold ${colors.text} mb-4`}>📁 Projects</h3>
      <ul className="space-y-6 text-gray-800">
        {form.projects.map((project, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-gray-900">{project.title}</strong>
              <span className="text-sm text-gray-500 italic">
                {project.start_date || 'Start Date'} - {project.end_date || 'End Date'}
              </span>
            </div>
            <p className="mb-3 text-gray-700">{project.description || 'No description provided.'}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies ? (
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  Tech: {project.technologies}
                </span>
              ) : (
                <span className="text-gray-400 italic text-xs">No technologies listed</span>
              )}
            </div>
            {project.location && (
              <div className="text-sm text-gray-600">
                📍 Location: {project.location}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
    <hr className="border-t border-gray-300 mt-6" />
  </>
)}

{/* Experience */}
{form.experience && form.experience.length > 0 && (
  <>
    <section>
      <h3 className={`text-lg font-semibold ${colors.text} mb-4`}>💼 Experience</h3>
      <ul className="space-y-6 text-gray-800">
        {form.experience.map((job, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl text-gray-900">{job.title || 'Job Title'}</strong>
              <span className="text-sm text-gray-500 italic">
                {job.startDate || 'Start Date'} - {job.currentlyWorking ? 'Present' : (job.endDate || 'End Date')}
              </span>
            </div>
            <div className="mb-2 text-gray-700 italic">at <em>{job.company || 'Company Name'}</em></div>
            <p className="mb-3 text-gray-700 whitespace-pre-wrap">{job.description || 'No description provided.'}</p>
            {job.location && (
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <span>📍</span>
                <span>{job.location}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
    <hr className="border-t border-gray-300 mt-6" />
  </>
)}


      {/* Education */}
     {/* Education */}
{form.education && form.education.length > 0 && (
  <>
    <section>
      <h3 className={`text-lg font-semibold ${colors.text} mb-4`}>🎓 Education</h3>
      <ul className="space-y-6 text-gray-800">
        {form.education.map((edu, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <div className="flex justify-between items-center mb-1">
              <strong className="text-xl text-gray-900">{edu.degree || 'Degree Name'}</strong>
              <span className="text-sm text-gray-500 italic">
                {edu.startYear || 'Start'} - {edu.currentlyStudying ? 'Present' : (edu.endYear || 'End')}
              </span>
            </div>
            <div className="mb-1 text-gray-700 italic">{edu.institution || 'Institution Name'}</div>
            {edu.location && (
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <span>📍</span>
                <span>{edu.location}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
    <hr className="border-t border-gray-300 mt-6" />
  </>
)}

    </div>
  );
}
