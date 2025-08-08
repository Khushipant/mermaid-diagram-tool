import React, { useContext, useState } from 'react';
import Login from './Login';
import Register from './Register';
import AuthContext from '../contexts/AuthContext';

function AuthPage() {
  const { user, logout } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (user && user.username) {
    return (
      <div className="max-w-xs mx-auto mb-4 p-4 bg-indigo-100 rounded-md text-indigo-900 text-center">
  <p className=" text-lg">
    Welcome, <strong>{user.username}</strong>!
  </p>
  <p className="mb-4 text-sm">Design, diagram, deliver greatness </p>
  {/* <button
    onClick={logout}
    className="relative inline-flex items-center px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm font-semibold mx-auto focus:outline-none group"
  >
    Log ou
    <span
      role="img"
      aria-label="waving hand"
      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-wave"
      style={{ animationIterationCount: 'infinite', animationDuration: '2s', animationTimingFunction: 'ease-in-out' }}
    >
      👋
    </span>
  </button> */}

  <style>{`
    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      15% { transform: rotate(15deg); }
      30% { transform: rotate(-10deg); }
      45% { transform: rotate(15deg); }
      60% { transform: rotate(-10deg); }
      75% { transform: rotate(15deg); }
    }
    .animate-wave {
      display: inline-block;
      animation-name: wave;
      transform-origin: 70% 70%;
    }
  `}</style>
</div>

    );
  }

  return (
    <div >
      <div className="flex justify-center space-x-6 mb-6">
  <button
    className={`px-6 py-2 rounded-t-md border-b-2 text-lg transition-colors duration-200 ${
      !showRegister
        ? 'font-bold border-indigo-600 text-indigo-700'
        : 'font-normal border-transparent text-gray-600 hover:text-indigo-600'
    }`}
    onClick={() => setShowRegister(false)}
  >
    Login
  </button>
  <button
    className={`px-6 py-2 rounded-t-md border-b-2 text-lg transition-colors duration-200 ${
      showRegister
        ? 'font-bold border-indigo-600 text-indigo-700'
        : 'font-normal border-transparent text-gray-600 hover:text-indigo-600'
    }`}
    onClick={() => setShowRegister(true)}
  >
    Sign Up
  </button>
</div>

      <div>
        {showRegister ? <Register /> : <Login />}
      </div>
    </div>
  );
}

export default AuthPage;
