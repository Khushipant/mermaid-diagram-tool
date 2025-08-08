import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      setMsg('Registration successful. You can now log in!');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" style={{ margin: '1em 0' }}>
      {/* <h2 className="text-2xl font-semibold text-center text-indigo-700">Sign Up</h2> */}

      <div>
        <label class="block mb-2  text-m font-medium text-gray-900">Username</label>
        <input
          type="text"
          placeholder="eg : MerERmaid"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block mb-2  text-m font-medium text-gray-900">Password</label>
        <input
          type="password"
          placeholder="Password (at least 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors font-semibold"
      >
        Sign Up
      </button>

      {msg && (
        <p
          className={`mt-4 text-center ${
            msg.includes('successful') ? 'text-green-600' : 'text-red-600'
          } font-medium`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}

export default Register;
