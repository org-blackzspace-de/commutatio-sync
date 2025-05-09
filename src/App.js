import React from 'react';
import FileDropZone from './FileDropZone';

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>📁 Datei-Upload</h1>
      <FileDropZone />
    </div>
  );
}

export default App;
