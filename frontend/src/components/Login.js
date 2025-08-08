import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      login(res.data.token, res.data.username);
      alert('Login successful');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" style={{ margin: '1em 0' }}>
      {/* <h2 className="text-2xl font-semibold text-center text-indigo-700">Login</h2> */}

      <div>
         <label class="block mb-2  text-m font-medium text-gray-900">Username</label>
        <input
          type="text"
          placeholder="Username"
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
          placeholder="Password"
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
        Login
      </button>
    </form>
  );
}

export default Login;
