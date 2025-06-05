export default function Skills({ form = {} , onChange }) {
  
  return (
    <div className="mb-6">
      <label className="block text-lg font-bold text-purple-600 mb-4">Skills</label>
      <input
        type="text"
        name="skills"
        value={form.skills}
        onChange={onChange}
        placeholder="Enter comma-separated skills"
        className="w-full p-3 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <p className="text-sm mt-1 text-gray-600">
        Enter skills separated by commas, e.g. JavaScript, React, Node.js
      </p>
    </div>
  );
}
