import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { email, password, name } = form;
    const BACK_URL = import.meta.env.VITE_FAST_BACKEND_URL;

    if (!BACK_URL) {
      setError('Wait for 10 to 20 seconds, the server is running slow!');
      return;
    }

    setLoading(true);
    setMessage('Waking up the server... please wait ⏳');

    try {
      const response = await fetch(`${BACK_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.detail)) {
          const errorMessages = data.detail
            .map((err) => `${err.loc.join(' > ')}: ${err.msg}`)
            .join('; ');
          setError(errorMessages);
        } else {
          setError(data.detail || 'Registration failed');
        }
      } else {
        setMessage('Registration successful! 🎉');
        setForm({ email: '', password: '', confirmPassword: '', name: '' });
        navigate('/login');
      }
    } catch (err) {
      setError('Error: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-purple-400 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create Your Account 📝</h2>

        {loading && (
          <p className="text-blue-300 text-sm mb-4 text-center">
            Waking up server... please wait ⏳
          </p>
        )}
        {message && <p className="mt-4 text-green-400 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm text-purple-200 font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-purple-100/10 border border-purple-300 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-purple-200 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-purple-100/10 border border-purple-300 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-purple-200 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-purple-100/10 border border-purple-300 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-purple-200 font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-purple-100/10 border border-purple-300 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-md"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-purple-200 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-300 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
