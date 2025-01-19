import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection';
import { COLORS } from '../styles/colors';
import AlertModal from '../components/AlertModal';
import Modal from '../components/Modal';
import { API_BASE_URL } from '../utils/Api_Base'


// Datos iniciales vacíos
const initialVideos = {
  frontend: [],
  backend: [],
  innovation: [],
};

export default function Home() {
  const [videos, setVideos] = useState(initialVideos);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}`)
      .then(response => response.json())
      .then(data => {
        const categorizedVideos = {
          frontend: data.filter(video => video.category === 'frontend'),
          backend: data.filter(video => video.category === 'backend'),
          innovation: data.filter(video => video.category === 'innovation'),
        };
        setVideos(categorizedVideos);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

  const handleEditVideo = (id: string) => {
    const video = Object.values(videos)
      .flat()
      .find((v) => v.id === id);
    setEditingVideo(video);
    setSelectedVideoId(id);
    setIsModalOpen(true);
  };

  const handleDeleteVideo = (id: string) => { 
    setIsModalOpen(false); // Cerrar el modal de edición si está abierto 
    setIsAlertOpen(true); // Abrir el modal de alerta 
    setSelectedVideoId(id); 
}; 

const handleDeleteVideoConfirm = () => { 
  fetch(`${API_BASE_URL}/${selectedVideoId}`, { method: 'DELETE', }) 
        .then(() => { 
            const updatedVideos = Object.fromEntries( 
                Object.entries(videos).map(([category, categoryVideos]) => [ 
                    category, 
                    categoryVideos.filter(video => video.id !== selectedVideoId) 
                ]) 
            ); 
            setVideos(updatedVideos); 
        }) 
        .catch(error => { 
            console.error('Error al eliminar el video:', error); 
        }); 
    setIsAlertOpen(false); // Cerrar el modal de alerta después de eliminar el video 
};

  const handleSaveVideo = (data: any) => {
    if (editingVideo) {
      fetch(`${API_BASE_URL}/${editingVideo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(updatedVideo => {
        const updatedVideos = {
          frontend: videos.frontend.filter(video => video.id !== editingVideo.id),
          backend: videos.backend.filter(video => video.id !== editingVideo.id),
          innovation: videos.innovation.filter(video => video.id !== editingVideo.id),
        };

        updatedVideos[updatedVideo.category].push(updatedVideo);

        setVideos(updatedVideos);
        setIsModalOpen(false);
        setEditingVideo(null);
      })
      .catch(error => {
        console.error('Error al actualizar el video:', error);
      });
    }
  };

  return (
    <div>
      <Banner />
      
      <div className="uppercase max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategorySection
          title="Frontend"
          color={COLORS.FRONTEND}
          videos={videos.frontend}
          onEditVideo={handleEditVideo}
          onDeleteVideo={handleDeleteVideo}
          category="frontend"
        />
        
        <CategorySection
          title="Backend"
          color={COLORS.BACKEND}
          videos={videos.backend}
          onEditVideo={handleEditVideo}
          onDeleteVideo={handleDeleteVideo}
          category="backend"
        />
        
        <CategorySection
          title="Innovación y Gestión"
          color={COLORS.INNOVATION}
          videos={videos.innovation}
          onEditVideo={handleEditVideo}
          onDeleteVideo={handleDeleteVideo}
          category="innovation"
        />
      </div>

      <Modal 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
    videoData={editingVideo} 
    onSave={handleSaveVideo} 
/> 

      <AlertModal 
    isOpen={isAlertOpen} 
    onClose={() => setIsAlertOpen(false)} 
    onConfirm={handleDeleteVideoConfirm} 
/>
   </div>
  );
}
