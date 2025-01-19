import React from 'react';
import { Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Header() {
  const location = useLocation();
  
  return (
    <header className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="AluraFlix Logo" className="h-10" />
          </Link>
          
          <nav className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 border-2  text-white rounded-md transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-600 text-white border-2'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/new-video"
              className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                location.pathname === '/new-video'
                  ? 'bg-blue-600 text-white border-2'
                  : 'text-gray-200 hover:bg-gray-100 border-2'
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>NUEVO VIDEO</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}