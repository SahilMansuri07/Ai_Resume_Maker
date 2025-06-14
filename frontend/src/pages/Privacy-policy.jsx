import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#ede9fe] via-[#f3e8ff] to-[#c7d2fe] px-4 py-16 relative">
      <div className="w-full max-w-3xl bg-white/80 rounded-3xl shadow-2xl p-8 backdrop-blur-lg border-t-4 border-purple-300 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 mb-6 text-center">
          Privacy Policy
        </h1>
        <div className="text-gray-700 text-base space-y-6">
          <p>
            <strong>Effective Date:</strong> June 14, 2025
          </p>
          <p>
            At ResumeGenie AI, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
          </p>
          <h2 className="text-lg font-bold text-purple-700 mt-4">1. Information Collection</h2>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>We collect information you provide when you register, create resumes, or give feedback &mdash; such as your name, email, and resume content.</li>
            <li>We automatically receive usage data such as your device, browser type, and interactions with our services.</li>
          </ul>

          <h2 className="text-lg font-bold text-purple-700 mt-4">2. Use of Information</h2>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>To provide, maintain, and improve ResumeGenie AI services.</li>
            <li>To personalize your experience and offer tailored resume tips.</li>
            <li>To communicate updates, respond to your inquiries, or notify you of important changes.</li>
          </ul>

          <h2 className="text-lg font-bold text-purple-700 mt-4">3. Data Security</h2>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>All data is encrypted in transit and at rest using industry-standard protocols.</li>
            <li>Access to your data is restricted to authorized personnel only.</li>
          </ul>

          <h2 className="text-lg font-bold text-purple-700 mt-4">4. Data Sharing</h2>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>We never sell or rent your personal information.</li>
            <li>We may share data with trusted partners solely to operate and improve our services, under strict confidentiality agreements.</li>
          </ul>

          <h2 className="text-lg font-bold text-purple-700 mt-4">5. Your Choices</h2>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>You may access, edit, or delete your information at any time from your dashboard.</li>
            <li>You can opt out of non-essential emails and notifications.</li>
          </ul>

          <h2 className="text-lg font-bold text-purple-700 mt-4">6. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of significant changes via email or our platform.
          </p>

          <h2 className="text-lg font-bold text-purple-700 mt-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or your data, please contact us at <a href="mailto:support@resumegenie.ai" className="text-purple-700 underline">support@resumegenie.ai</a>.
          </p>
        </div>
      </div>
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-gradient-to-r from-purple-400/20 via-indigo-400/10 to-purple-300/20 blur-2xl rounded-full pointer-events-none" />
    </div>
  );
}