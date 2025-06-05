export default function PersonalDetails({ form = {}, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="block text-lg  font-bold text-purple-600  mb-2">Personal Details</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold text-black mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full Name"
            className="w-full p-3 rounded border border-purple-300"
          />
        </div>

        <div>
          <label className="block font-semibold text-black mb-1">Job Title</label>
          <input
            name="job_title"
            value={form.job_title}
            onChange={onChange}
            placeholder="Job Title"
            className="w-full p-3 rounded border border-purple-300"
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <label className="block font-semibold text-black mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              className="w-full p-3 rounded border border-purple-300"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block font-semibold text-black mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Phone"
              className="w-full p-3 rounded border border-purple-300"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-black mb-1">GitHub Link</label>
          <input
            name="github"
            value={form.github}
            onChange={onChange}
            placeholder="GitHub Link"
            className="w-full p-3 rounded border border-purple-300"
          />
        </div>

        <div>
          <label className="block font-semibold text-black mb-1">LinkedIn Link</label>
          <input
            name="linkedin"
            value={form.linkedin}
            onChange={onChange}
            placeholder="LinkedIn Link"
            className="w-full p-3 rounded border border-purple-300"
          />
        </div>

        <div>
          <label className="block font-semibold text-black mb-1">Portfolio Link</label>
          <input
            name="portfolio"
            value={form.portfolio}
            onChange={onChange}
            placeholder="Portfolio Link"
            className="w-full p-3 rounded border border-purple-300"
          />
        </div>
      </div>
    </div>
  );
}
