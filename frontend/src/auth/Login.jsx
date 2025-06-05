import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();

        if (Array.isArray(data.detail)) {
          const errorMessages = data.detail
            .map((err) => `${err.loc.join(' > ')}: ${err.msg}`)
            .join('; ');
          setError(errorMessages);
        } else {
          setError(data.detail || 'Login failed');
        }
      } else {
        const data = await response.json();
        setMessage('Login successful! Welcome back!');
        setForm({ email: '', password: '' });
        navigate("/");// optional
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-purple-400 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back 👋</h2>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        {message && <p className="text-green-400 text-sm mb-4 text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your email"
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

          <div className="flex items-center justify-between text-sm text-purple-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-600" />
              Remember me
            </label>
            <Link to="#" className="hover:underline text-purple-200">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-purple-200 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-300 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
