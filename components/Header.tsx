import React from 'react';
import { CameraIcon } from './icons/CameraIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center w-full">
        <div className="flex items-center justify-center mb-4">
            <CameraIcon className="w-16 h-16 text-orange-500" />
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 ml-4">
                Magic Polaroid
            </h1>
        </div>
      <p className="max-w-2xl mx-auto mt-2 text-xl text-gray-600">
        Turn your favorite photos into super cool Polaroid snapshots!
      </p>
    </header>
  );
};

export default Header;