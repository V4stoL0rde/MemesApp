import React from 'react';

const Upload = () => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://memes-api.grye.org/memes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Meme subido exitosamente.');
        window.location.href = '/home';
      } else {
        alert('Error al subir el meme.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="upload-container">
      <h1>Subir un Meme</h1>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default Upload;
