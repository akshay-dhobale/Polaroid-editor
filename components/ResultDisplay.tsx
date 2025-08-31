import React from 'react';
import Button from './Button';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  imageUrl: string;
  originalFile: File | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl, originalFile }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;

    let downloadName = 'my-magic-polaroid.png'; // Default name

    if (originalFile) {
      const originalName = originalFile.name;
      const lastDotIndex = originalName.lastIndexOf('.');
      
      const nameWithoutExt = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
      const extension = lastDotIndex !== -1 ? originalName.substring(lastDotIndex + 1) : 'png';
      
      downloadName = `${nameWithoutExt}-polaroid-by-ak.${extension}`;
    }

    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Tada! Here it is! ✨</h2>
        <img 
            src={imageUrl} 
            alt="Generated Polaroid" 
            className="max-w-full h-auto max-h-96 rounded-sm shadow-xl"
        />
        <Button onClick={handleDownload} className="mt-8">
            <DownloadIcon className="w-6 h-6 mr-2" />
            Download Picture
        </Button>
    </div>
  );
};

export default ResultDisplay;