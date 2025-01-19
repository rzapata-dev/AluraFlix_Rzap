import React from 'react';
import BannerVideo from './BannerVideo';
import bannerBackground from '../assets/banner.svg';


export default function Banner() {
  return (
    <div className="relative h-[600px] bg-cover bg-center">
        {/* Background image overlay */}
         <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${bannerBackground})` }} 
      />
      <div className="absolute inset-0 grid grid-cols-2">
        {/* Left side - Content */}
        <div className="relative z-10 flex flex-col justify-center p-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md w-fit hover:bg-blue-700 transition-colors">
            FRONTEND
          </button>
          <h2 className="text-4xl font-bold text-white mb-4">
            CHALLENGE REACT
          </h2>
          <p className="text-xl text-gray-200 max-w-xl mb-6">
            Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
          </p>
        </div>

        {/* Right side - Video */}
        <div className="relative hover: flex items-center justify-center p-8" >
          <BannerVideo />
        </div>
      </div>
    </div>
  );
}