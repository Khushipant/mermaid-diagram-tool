import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AuthPage from './AuthPage';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <>
      <nav className="bg-indigo-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-extrabold select-none cursor-default">MerERmaid</div>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.username || 'User'}</span>
              <button
                onClick={logout}
                className="bg-indigo-900 hover:bg-indigo-800 px-3 py-1 rounded text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginPopup(true)}
              className="bg-indigo-900 hover:bg-indigo-800 px-3 py-1 rounded text-sm transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {showLoginPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowLoginPopup(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-96 shadow-lg max-w-full"
            onClick={e => e.stopPropagation()} 
          >
            <AuthPage
              onLoginSuccess={() => setShowLoginPopup(false)}
            />

            {/* <button
              onClick={() => setShowLoginPopup(false)}
              className="mt-4 w-full py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
