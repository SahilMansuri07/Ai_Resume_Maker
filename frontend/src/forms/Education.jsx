import { useState } from "react";

export default function Education({ form, onChange }) {
  const [education, setEducation] = useState(
    form.education && form.education.length > 0
      ? form.education
      : [
          {
            degree: "",
            institution: "",
            location: "",
            start_date : "",
            end_date : "",
            currentlyStudying: false,
          },
        ]
  );

  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
    onChange({ target: { name: "education", value: updated } });
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        institution: "",
        location: "",
        start_date : "",
        end_date : "",
        currentlyStudying: false,
      },
    ]);
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      const updated = education.filter((_, i) => i !== index);
      setEducation(updated);
      onChange({ target: { name: "education", value: updated } });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-purple-700">Education</h3>

      {education.map((edu, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Education #{index + 1}</h4>
            {education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
              placeholder="Bachelor of Science in Computer Science"
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
              placeholder="University Name"
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={edu.location}
              onChange={(e) => handleEducationChange(index, "location", e.target.value)}
              placeholder="City, Country"
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={edu.start_date}
                onChange={(e) => handleEducationChange(index, "start_date", e.target.value)}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={edu.end_date}
                onChange={(e) => handleEducationChange(index, "end_date", e.target.value)}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
          </div>
          
          

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`currentlyStudying_${index}`}
              checked={edu.currentlyStudying}
              onChange={(e) => {
                const checked = e.target.checked;
                handleEducationChange(index, "currentlyStudying", checked);
                if (checked) {
                  handleEducationChange(index, "endYear", "");
                }
              }}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
            <label htmlFor={`currentlyStudying_${index}`} className="text-sm text-gray-700">
              I currently study here
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="flex items-center text-purple-600 hover:text-purple-800"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Another Education
      </button>
    </div>
  );
}