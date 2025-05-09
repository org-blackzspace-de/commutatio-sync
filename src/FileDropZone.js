import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropZone = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('files', file);
      });

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status} – ${errorText}`);
        }

        const result = await response.json();
        console.log('Upload erfolgreich:', result);
        alert(`Erfolgreich hochgeladen: ${result.files.join(', ')}`);
      } catch (error) {
        console.error('❌ Fehler beim Hochladen:', error);
        alert('Upload fehlgeschlagen: ' + error.message);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #007bff',
        padding: '40px',
        textAlign: 'center',
        borderRadius: '12px',
        backgroundColor: isDragActive ? '#e0f0ff' : '#f8f9fa',
        cursor: 'pointer',
        color: '#333',
        fontSize: '16px',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive
        ? <p>Dateien hier ablegen...</p>
        : <p>Ziehe Dateien hierher oder klicke, um sie auszuwählen</p>}
    </div>
  );
};

export default FileDropZone;
