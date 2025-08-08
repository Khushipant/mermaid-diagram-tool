// src/components/Editor.js

function Editor({ code, setCode }) {
  return (
    <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Type your Mermaid ER diagram code here..."
        className="w-full text-base font-mono border border-gray-300 rounded-md p-2 bg-gray-10 "
        style={{ height: '31rem' }}/>
  );
}

export default Editor;
