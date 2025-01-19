import React from 'react';
import { Video } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-4">
             <img src={logo} alt="Aluraflix Logo" className="h-10" />
          </div>
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} AluraFlix Challenge. Made by Richard Zapata. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}