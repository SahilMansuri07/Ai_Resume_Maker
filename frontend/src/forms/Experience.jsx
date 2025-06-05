import { useState } from "react";

export default function Experience({ form, onChange }) {
  const [experiences, setExperiences] = useState(
    form.experience && form.experience.length > 0
      ? form.experience
      : [
          {
            title: "",
            company: "",
            location: "",
            start_date : "",
            end_date : "",
            description: "",
          },
        ]
  );

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
    onChange({ target: { name: "experience", value: updated } });
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        company: "",
        location: "",
        start_date : "",
        end_date : "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      const updated = experiences.filter((_, i) => i !== index);
      setExperiences(updated);
      onChange({ target: { name: "experience", value: updated } });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-purple-700">Experience</h3>

      {experiences.map((exp, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg space-y-4"
        >
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Experience #{index + 1}</h4>
            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) =>
                  handleExperienceChange(index, "title", e.target.value)
                }
                placeholder="Software Engineer"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
                placeholder="Company Name"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) =>
                  handleExperienceChange(index, "location", e.target.value)
                }
                placeholder="City, Country"
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={exp.start_date}
                  onChange={(e) =>
                    handleExperienceChange(index, "start_date", e.target.value)
                  }
                  className="w-full p-2 rounded border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={exp.end_date}
                  onChange={(e) =>
                    handleExperienceChange(index, "end_date", e.target.value)
                  }
                  className="w-full p-2 rounded border border-gray-300"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) =>
                handleExperienceChange(index, "description", e.target.value)
              }
              placeholder="Describe your role and responsibilities"
              rows={4}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
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
        Add Another Experience
      </button>
    </div>
  );
}
