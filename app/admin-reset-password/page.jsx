"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = new URLSearchParams(window.location.search).get('token');

    try {
      const res = await fetch('/api/admin/password-change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (res.ok) {
        setSuccess('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/auth/admin/login');
        }, 3000);
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
}
