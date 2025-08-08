// src/components/ResizableSplitView.js
import React, { useState, useRef, useEffect } from 'react';

const ResizableSplitView = ({ left, right }) => {
  // Default to 40% left, 60% right for 2:3 ratio approx.
  const [dividerPosition, setDividerPosition] = useState(40);
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

    const containerRect = container.getBoundingClientRect();
    let newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;


    if (newPosition < 10) newPosition = 10;
    if (newPosition > 90) newPosition = 90;

    setDividerPosition(newPosition);
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
        display: 'flex',
        height: 'calc(100vh - 200px)', // adjust for navbar + margins roughly
        width: '100%',
        overflow: 'hidden',
        userSelect: isDragging.current ? 'none' : 'auto',
      }}
    >
      {/* Left pane — editor */}
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

      {/* Divider */}
      <div
        style={{
          width: '5px',
          cursor: 'col-resize',
          backgroundColor: '#888',
          userSelect: 'none',
        }}
        onMouseDown={onMouseDown}
        role="separator"
        aria-orientation="vertical"
      />

      {/* Right pane — diagram preview */}
      <div style={{ flexGrow: 1, overflow: 'auto' }}>{right}</div>
    </div>
  );
};

export default ResizableSplitView;
