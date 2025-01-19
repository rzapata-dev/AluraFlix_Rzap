import React from 'react';
import { X } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="uppercase text-xl font-bold text-red-500">¿Estás seguro de eliminar este video?</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-300 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onConfirm} className="uppercase bg-red-500 text-white px-3 py-1 rounded">
            Sí
          </button>
          <button onClick={onClose} className="uppercase bg-gray-400 text-gray-800 px-3 py-1 rounded mx-2">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
