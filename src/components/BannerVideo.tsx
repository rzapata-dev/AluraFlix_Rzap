import React from 'react';
import { Play } from 'lucide-react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function BannerVideo() {
  React.useEffect(() => {
    Fancybox.bind("[data-fancybox='banner']", {
      // Custom options for banner video
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  const videoUrl = "https://www.youtube.com/embed/ov7vA5HFe6w";
  const thumbnailUrl = "https://img.youtube.com/vi/ov7vA5HFe6w/maxresdefault.jpg";

  return (
    <div className="w-full aspect-video rounded-lg boxShadow shadow-indigo-600 border-2 overflow-hidden  transition-transform hover:scale-105 shadow-2xl"
     >
      <a
        href={videoUrl}
        data-fancybox="banner"
        data-type="iframe"
        className="block relative"
      >
        <img 
          src={thumbnailUrl}
          alt="Challenge React"
          className=" w-full object-cover rounded-lg  shadow-indigo-600"
          style={{ 
            border: '2px solid rgba(30, 20, 212, 0.947)',
            boxShadow: '12px 20px 40px rgb(109, 103, 217)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-16 h-16 text-white" />
        </div>
      </a>
    </div>
  );
}
