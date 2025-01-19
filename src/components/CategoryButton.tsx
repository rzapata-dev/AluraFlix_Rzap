import React from 'react';

interface CategoryButtonProps {
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function CategoryButton({ color, children, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 rounded-md text-white font-bold uppercase tracking-wide transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}