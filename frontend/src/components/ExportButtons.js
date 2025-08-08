import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Basic Mermaid to SQL stub for demo purposes
function mermaidToSQL(code, dialect = 'postgres') {
  // Expand this to real parsing as needed!
  if (!code.startsWith('erDiagram')) return '-- Not an ER diagram.';
  let sql = '-- SQL export (placeholder)\n';
  if (dialect === 'postgres') sql += '-- For PostgreSQL\n';
  else if (dialect === 'mysql') sql += '-- For MySQL\n';
  else if (dialect === 'sqlserver') sql += '-- For SQL Server\n';
  else if (dialect === 'oracle') sql += '-- For Oracle SQL\n';
  sql += '-- TODO: Implement real conversion.\n';
  return sql;
}

const ExportButtons = ({ code }) => {
  const previewRef = useRef();

  // SVG
  const downloadSVG = () => {
    const svg = previewRef.current.querySelector('svg');
    if (svg) {
      const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'diagram.svg';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // PNG
  const downloadPNG = () => {
    html2canvas(previewRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'diagram.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // PDF
  const downloadPDF = () => {
    html2canvas(previewRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      pdf.save('diagram.pdf');
    });
  };

  // SQL
  const downloadSQL = (dialect) => {
    const sql = mermaidToSQL(code, dialect);
    const blob = new Blob([sql], { type: 'text/sql' });
    const link = document.createElement('a');
    link.download = `diagram_${dialect}.sql`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div style={{ margin: '1em 0' }}>
      <button onClick={downloadSVG}>Export as SVG</button>{' '}
      <button onClick={downloadPNG}>Export as PNG</button>{' '}
      <button onClick={downloadPDF}>Export as PDF</button>
      <span style={{ marginLeft: 10 }}>Export SQL:</span>
      <button onClick={() => downloadSQL('postgres')}>PostgreSQL</button>
      <button onClick={() => downloadSQL('mysql')}>MySQL</button>
      <button onClick={() => downloadSQL('sqlserver')}>SQL Server</button>
      <button onClick={() => downloadSQL('oracle')}>Oracle SQL</button>
      <div ref={previewRef} id="exportPreview">
        {/* Your DiagramPreview goes here */}
      </div>
    </div>
  );
};

export default ExportButtons;
