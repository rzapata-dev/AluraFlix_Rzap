import React, { useState } from 'react';
import VideoForm from '../components/VideoForm';
import { API_BASE_URL } from '../utils/Api_Base'

export default function NewVideo() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    videoUrl: '',
    description: '',
  });
  const [videoId, setVideoId] = useState(null);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        setVideoId(result.id); // Guarda la ID generada por la API
        console.log('Video guardado:', result);
      } else {
        console.error('Error al guardar el video:', response.status);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="max-w-3xl bg-gray-900 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl text-gray-100 font-bold mb-8">NUEVO VIDEO</h1>
      <VideoForm onSubmit={handleSubmit} submitLabel="Crear Video" />
      {videoId && <p>Video guardado con ID: {videoId}</p>}
    </div>
  );
}
