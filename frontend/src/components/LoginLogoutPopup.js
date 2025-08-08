import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AuthPage from './AuthPage';

const LoginLogoutPopup = ({ onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const [showAuthPage, setShowAuthPage] = useState(true);

  const handleLogout = () => {
    logout(); // Call your logout logic from context
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg p-6 w-96 shadow-lg max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {user ? (
          <>
             <div className="max-w-xs mx-auto mb-4 p-4 bg-indigo-100 rounded-md text-indigo-900 text-center">
  <p className=" text-lg">
    Welcome, <strong>{user.username}</strong>!
  </p>
  <p className="mb-4 text-sm">Design, diagram, deliver greatness </p>
  <button
    onClick={logout}
    className="relative inline-flex items-center px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm font-semibold mx-auto focus:outline-none group"
  >
    Log out
    <span
      role="img"
      aria-label="waving hand"
      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-wave"
      style={{ animationIterationCount: 'infinite', animationDuration: '2s', animationTimingFunction: 'ease-in-out' }}
    >
      👋
    </span>
  </button>

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

            {/* <button
              onClick={handleLogout}
              className="w-full py-2 mb-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Log Out
            </button> */}

            <button
              onClick={onClose}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition relative flex justify-center items-center gap-2 text-sm font-medium group"
            >
              Continue
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                role="img"
                aria-label="smiling face"
                style={{ fontSize: '1.2rem' }}
              >
                😊
              </span>
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Please Log In</h2>

            <AuthPage
              onLoginSuccess={() => {
                setShowAuthPage(false);
                onClose();
              }}
            />
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginLogoutPopup;
