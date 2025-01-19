import React from 'react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
}

interface CategorySectionProps {
  title: string;
  color: string;
  videos: Video[];
  onEditVideo: (id: string) => void;
  onDeleteVideo: (id: string) => void;
  category: 'frontend' | 'backend' | 'innovation';
}

export default function CategorySection({
  title,
  color,
  videos,
  onEditVideo,
  onDeleteVideo,
  category,
}: CategorySectionProps) {
  React.useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      // Custom options
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <div className={`py-8 ${category}-section bg-gray-900`}>
      <h2
        className="text-2xl font-bold mb-6 px-4"
        style={{ color: color }}
      >
        {title}
      </h2>
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos && videos.map((video) => (
          <div key={video.id}>
            <VideoCard
              {...video}
              categoryColor={color}
              onEdit={() => onEditVideo(video.id)}
              onDelete={() => onDeleteVideo(video.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
