import { useState } from "react";
import { LuBrain } from "react-icons/lu";

export default function Summary({ form, onChange }) {
  
  const [aiText, setAiText] = useState('');
  const isValid = form.summary.trim().length >= 100;

  const handleSubmit = async () => {
    console.log(form.personal.job_title)
    try {
      const response = await fetch("http://127.0.0.1:8000/gen/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ✅ Send full form as reference so AI can generate summary
        body: JSON.stringify({job_title :form.personal.job_title}),
      });

      const data = await response.json();

      if (response.ok) {
        const summary = data.summary || 'No summary generated.';
        setAiText(summary);
        onChange({ target: { name: "summary", value: summary } }); // update main summary
      } else {
        setAiText('Failed to generate summary: ' + (data.detail || 'Unknown error'));
      }
    } catch (err) {
      setAiText('Error: ' + err.message);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-bold text-purple-600 mb-4">
        Professional Summary
      </label>

      <div className="flex border border-purple-600 w-50 hover:bg-purple-600 rounded-2xl hover:text-white mb-4">
        <button onClick={handleSubmit} className="p-2 flex gap-4 justify-center items-center font-bold cursor-pointer">
          <LuBrain className="text-xl" />
          <p>Generate From AI</p>
        </button>
      </div>

      <textarea
        name="summary"
        value={form.summary}
        onChange={onChange}
        placeholder="Write a short summary about yourself"
        className={`w-full p-4 rounded-md bg-white text-black resize-none transition-all duration-300 focus:outline-none focus:ring-2 ${
          isValid
            ? 'border-2 border-purple-500 focus:ring-purple-500'
            : 'border border-gray-300 focus:ring-red-400'
        }`}
        rows={6}
      />

      {/* ✅ Show AI Text Output */}
      {aiText && (
        <div className="mt-4">
          <h1 className="text-sm font-semibold mb-1 text-purple-600">AI Response:</h1>
          <span className="bg-gray-200 text-black px-3 py-2 inline-block rounded-md">{aiText}</span>
        </div>
      )}

      <p className={`text-sm mt-1 ${isValid ? 'text-green-600' : 'text-red-500'}`}>
        {isValid
          ? 'Looks great!'
          : 'Try to write at least 100 characters.'}
      </p>
    </div>
  );
}
