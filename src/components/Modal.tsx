import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoData {
  id?: string;
  title: string;
  category: string;
  videoUrl: string;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoData?: VideoData;
  onSave: (data: VideoData) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, videoData, onSave }) => {
  const [formData, setFormData] = useState<VideoData>({
    id: '',
    title: '',
    category: 'frontend',
    videoUrl: '',
    description: '',
  });

  useEffect(() => {
    if (videoData) setFormData(videoData);
  }, [videoData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg w-96 border-indigo-500 border-2">
        <div className="flex justify-between items-center mb-6 text-blue-300">
          <h2 className="uppercase text-xl font-bold text-blue-400">
            {formData.id ? 'Editar Video' : 'Agregar Video'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-300 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label className="block text-gray-400">Título</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full  bg-transparent text-indigo-200 border-2 border-blue-400 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full  bg-transparent text-indigo-200 border-2 border-blue-400 px-2 py-1 rounded"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="innovation">Innovación y Gestión</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">URL del Video</label>
            <input
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full bg-transparent text-indigo-200 border-2 border-blue-400 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-transparent text-indigo-200 border-2 border-blue-400 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="uppercase bg-gray-500 text-white px-3 py-1 rounded mr-2"
            >
              Cancelar
            </button>
            <button type="submit" className="uppercase bg-blue-500 text-white px-3 py-1 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;