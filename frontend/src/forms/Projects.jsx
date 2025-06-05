import React, { useState, useEffect } from 'react';

export default function Projects({ form, onChange }) {
  const [projects, setProjects] = useState(
    form.projects?.length > 0
      ? form.projects
      : [
          {
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            location: "",
            technologies: ""
          }
        ]
  );

  useEffect(() => {
    if (form.projects && form.projects !== projects) {
      setProjects(form.projects);
    }
  }, [form.projects]);

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
    onChange({ target: { name: "projects", value: updated } });
  };

  const addProject = () => {
    const newProject = {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "",
      technologies: ""
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    onChange({ target: { name: "projects", value: updated } });
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      const updated = projects.filter((_, i) => i !== index);
      setProjects(updated);
      onChange({ target: { name: "projects", value: updated } });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-purple-700">Projects</h3>
      {projects.map((project, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Project #{index + 1}</h4>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleProjectChange(index, "title", e.target.value)}
              placeholder="Project title"
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
            <textarea
              value={project.description}
              onChange={(e) => handleProjectChange(index, "description", e.target.value)}
              placeholder="Describe your project"
              rows={4}
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={project.start_date}
                onChange={(e) => handleProjectChange(index, "start_date", e.target.value)}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={project.end_date}
                onChange={(e) => handleProjectChange(index, "end_date", e.target.value)}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={project.location}
              onChange={(e) => handleProjectChange(index, "location", e.target.value)}
              placeholder="Project location"
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
            <input
              type="text"
              value={project.technologies}
              onChange={(e) => handleProjectChange(index, "technologies", e.target.value)}
              placeholder="Comma-separated technologies"
              className="w-full p-2 rounded border border-gray-300"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
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
        Add Another Project
      </button>
    </div>
  );
}
