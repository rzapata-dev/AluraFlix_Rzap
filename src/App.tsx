import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewVideo from './pages/NewVideo';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-video" element={<NewVideo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}