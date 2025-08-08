import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

function DiagramPreview({ code }) {
  const ref = useRef(null);
  const uniqueId = useRef(
    "erDiagramPreview_" + Math.random().toString(36).substr(2, 9)
  );

  const [error, setError] = useState("");        
  const [lastSvg, setLastSvg] = useState("");    

  useEffect(() => {
    let mounted = true;

    async function renderMermaid() {
      if (!ref.current) return;

      if (!code || !code.trim()) {
        setError("");
        setLastSvg("");
        ref.current.innerHTML = "";
        return;
      }

      try {
        mermaid.initialize({ startOnLoad: false });
        const { svg } = await mermaid.render(uniqueId.current, code);
        if (mounted && ref.current) {
          ref.current.innerHTML = svg;
          setLastSvg(svg);   
          setError("");     
        }
      } catch (err) {
        // Leave ref.current.innerHTML as previous SVG
        if (mounted) setError(err.message || "Diagram error.");
      }
    }

    renderMermaid();
    return () => {
      mounted = false;
    };
  }, [code]);

  return (
    <div>

      <div ref={ref} dangerouslySetInnerHTML={{ __html: lastSvg }} />
      {error && (
        <div style={{ color: 'red', marginTop: 8 }}>
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default DiagramPreview;
