import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  id: string;
  videoTitle: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onConfirm, id, videoTitle }) => {
  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center`}>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Eliminar Video</h2>
        <p className="text-gray-700 mb-4">¿Estás seguro que deseas eliminar el video "{videoTitle}"?</p>
        <div className="flex justify-center">
        <button
  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
  onClick={() => onConfirm(id)}
>
  Sí, eliminar
</button>
<button
  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
  onClick={onClose}
>
  No, cancelar
</button>

        </div>
      </div>
    </div>
  );
};

export default VideoModal;
