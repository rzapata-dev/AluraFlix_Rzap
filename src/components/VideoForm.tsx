import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/Api_Base'

interface VideoFormProps {
  submitLabel?: string;
}

export default function VideoForm({ submitLabel = "Save" }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'frontend',
    imageUrl: '',
    videoUrl: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    category: false,
    imageUrl: false,
    videoUrl: false,
    description: false,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for the field being updated
    setErrors({ ...errors, [name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      title: formData.title.trim() === '',
      category: formData.category.trim() === '',
      imageUrl: formData.imageUrl.trim() === '',
      videoUrl: formData.videoUrl.trim() === '',
      description: formData.description.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      console.error('Form contains errors. Please fill all fields.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Video guardado:', result);
        navigate('/'); // Redirige a la página principal
      } else {
        console.error('Error al guardar el video:', response.status);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm">Title is required.</p>}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.category ? 'border-red-500' : ''}`}
        >
          <option value="">Select a category</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="innovation">Innovation & Management</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">Category is required.</p>}
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.imageUrl ? 'border-red-500' : ''}`}
        />
        {errors.imageUrl && <p className="text-red-500 text-sm">Image URL is required.</p>}
      </div>

      <div>
        <label
          htmlFor="videoUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Video URL
        </label>
        <input
          type="url"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.videoUrl ? 'border-red-500' : ''}`}
        />
        {errors.videoUrl && <p className="text-red-500 text-sm">Video URL is required.</p>}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-500 text-sm">Description is required.</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="reset"
          onClick={() => {
            setFormData({ title: '', category: '', imageUrl: '', videoUrl: '', description: '' });
            setErrors({ title: false, category: false, imageUrl: false, videoUrl: false, description: false });
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
