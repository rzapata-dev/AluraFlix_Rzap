import React from 'react';
import { Pencil, Trash2, Play } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  categoryColor: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function VideoCard({
  id,
  title,
  videoUrl,
  description,
  categoryColor,
  onEdit,
  onDelete
}: VideoCardProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]*)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoUrl.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]*)/)?.[1]}/maxresdefault.jpg`;

  return (
    <div 
      className="bg-gray-800 hover:scale-105 rounded-lg overflow-hidden shadow-lg"
      style={{ boxShadow: `1px 4px 20px ${categoryColor}40` }}
    >
      <div className="relative aspect-video">
        <a
          href={getYouTubeEmbedUrl(videoUrl)}
          data-fancybox="gallery"
          data-type="iframe"
          className="block relative"
        >
          <img 
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className=" border-2 absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
            <Play className="w-14 h-14 text-white" />
          </div>
        </a>
      </div>
      <div className="p-4 border-4"style={{ borderColor: categoryColor }}>
        <h3 className="text-xl font-bold mb-2 line-clamp-1 text-white">{title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-white transition-colors"
            style={{ backgroundColor: categoryColor }}
          >
            <span>EDITAR</span>
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <span>ELIMINAR</span>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}