import React, { useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div 
        className="w-full max-w-lg p-10 bg-white/70 border-4 border-dashed border-gray-300 rounded-3xl text-center cursor-pointer hover:border-orange-400 hover:bg-white transition-all duration-300 shadow-lg"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div className="flex flex-col items-center justify-center">
        <UploadIcon className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-2xl font-bold text-gray-700">
          <span className="text-orange-500">Click to choose</span> or drag a photo here
        </p>
        <p className="text-md text-gray-500 mt-2">Pick your favorite picture to begin!</p>
      </div>
    </div>
  );
};

export default ImageUploader;