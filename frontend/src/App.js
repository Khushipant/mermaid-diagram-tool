import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Editor from './components/Editor';
import DiagramPreview from './components/DiagramPreview';
import AuthContext from './contexts/AuthContext';
import LoginLogoutPopup from './components/LoginLogoutPopup';
import NavBar from './components/NavBar';

// Resizable Split View component to provide draggable divider
const ResizableSplitView = ({ left, right }) => {
  const [dividerPosition, setDividerPosition] = useState(40); // left pane width % (2/5 approx)
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const onMouseDown = () => {
    isDragging.current = true;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    let newPos = ((e.clientX - rect.left) / rect.width) * 100;
    if (newPos < 20) newPos = 20; // min 20%
    if (newPos > 80) newPos = 80; // max 80%
    setDividerPosition(newPos);
  };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: 'calc(100vh - 180px)', // adjusts based on top UI (navbar+title+input+buttons)
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        userSelect: isDragging.current ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          flexBasis: `${dividerPosition}%`,
          flexGrow: 0,
          flexShrink: 0,
          overflow: 'auto',
          borderRight: '2px solid #ddd',
        }}
      >
        {left}
      </div>
      <div
        onMouseDown={onMouseDown}
        style={{
          width: '6px',
          cursor: 'col-resize',
          backgroundColor: '#888',
          userSelect: 'none',
        }}
        role="separator"
        aria-orientation="vertical"
      />
      <div style={{ flexGrow: 1, overflow: 'auto' }}>{right}</div>
    </div>
  );
};

function App() {
  const [code, setCode] = useState('');
  const [diagrams, setDiagrams] = useState([]);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [colorTheme, setColorTheme] = useState('default');
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.token) fetchDiagrams();
    else setDiagrams([]);
  }, [user]);

  const fetchDiagrams = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/diagrams', {
        headers: { Authorization: 'Bearer ' + user.token },
      });
      setDiagrams(res.data);
    } catch {
      setDiagrams([]);
    }
  };

  const handleSave = async () => {
    if (!user || !user.token) {
      setShowAuthPopup(true);
      return;
    }
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/diagrams/${editId}`,
          { title, code },
          { headers: { Authorization: 'Bearer ' + user.token } }
        );
        alert('Diagram updated!');
      } else {
        await axios.post(
          'http://localhost:5000/api/diagrams',
          { title, code },
          { headers: { Authorization: 'Bearer ' + user.token } }
        );
        alert('Diagram saved!');
      }
      setEditId(null);
      setTitle('');
      setCode('');
      fetchDiagrams();
    } catch {
      alert('Error saving diagram');
    }
  };

  const handleEdit = (diagram) => {
    setEditId(diagram._id);
    setCode(diagram.code);
    setTitle(diagram.title || '');
  };

  const handleDelete = async (id) => {
    if (!user?.token) return;
    if (!window.confirm('Are you sure you want to delete this diagram?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/diagrams/${id}`, {
        headers: { Authorization: 'Bearer ' + user.token },
      });
      fetchDiagrams();
    } catch {
      alert('Delete failed');
    }
  };

  const getThemeInitString = () => {
    if (colorTheme === 'default') return '';
    if (colorTheme === 'warm') {
      return `%%{init: {"theme":"base","themeVariables":{"primaryColor":"#f3d5b5","primaryTextColor":"#243c5a","lineColor":"#e07a5f","attributeBackground":"#f4f1bb","attributeTextColor":"#3d405b"}}}%%\n`;
    }
    if (colorTheme === 'cool') {
      return `%%{init: {"theme":"base","themeVariables":{"primaryColor":"#a0c4ff","primaryTextColor":"#1b263b","lineColor":"#457b9d","attributeBackground":"#caf0f8","attributeTextColor":"#1b263b"}}}%%\n`;
    }
    if (colorTheme === 'dark') {
      return `%%{init: {"theme":"dark"}}%%\n`;
    }
    return '';
  };

  const enhancedCode = `${getThemeInitString()}${code}`;

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen flex flex-col">

      <NavBar />

      {/* <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">
        ER Diagram Editor (MERN + Mermaid.js)
      </h1> */}

      {/* Diagram Title */}
      <input
        className="w-full p-2 mt-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xl font-semibold"
        type="text"
        placeholder="Diagram Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Split screen layout with resizable panes */}
      <ResizableSplitView
        left={
          <>
        
            <Editor code={code} setCode={setCode} />
         
            
            {/* Action Buttons */}
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-md text-white font-semibold"
              >
                {editId ? 'Update Diagram' : 'Save Diagram'}
              </button>
              {editId && (
                <button
                  onClick={() => {
                    setEditId(null);
                    setTitle('');
                    setCode('');
                  }}
                  className="px-6 py-3 bg-gray-300 hover:bg-gray-400 transition rounded-md font-semibold"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </>
        }
        right={
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md min-h-[500px] overflow-auto">
            <DiagramPreview code={enhancedCode} />
          </div>
        }
      />

      {/* Saved Diagrams List */}
      {user && (
        <>
          <h2 className="mt-12 mb-6 text-3xl font-bold text-indigo-700">Your Saved Diagrams</h2>
          {diagrams.length === 0 ? (
            <p className="text-gray-500">No diagrams saved yet.</p>
          ) : (
            diagrams.map((diagram) => (
              <div
                key={diagram._id}
                className={`mb-6 p-5 rounded-lg border ${
                  editId === diagram._id ? 'bg-indigo-50 border-indigo-400' : 'bg-white border-gray-200'
                } shadow-sm`}
              >
                <h3 className="text-xl font-semibold mb-3">{diagram.title || 'Untitled Diagram'}</h3>
                <DiagramPreview code={diagram.code} />
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleEdit(diagram)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(diagram._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {/* Login/Logout Popup */}
      {showAuthPopup && <LoginLogoutPopup onClose={() => setShowAuthPopup(false)} />}
    </div>
  );
}

export default App;
