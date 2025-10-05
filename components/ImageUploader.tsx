import React, { useRef, useState, useCallback } from 'react';
import { UploadCloudIcon } from './Icons';
import { filterStyleMap } from '../constants/filters';

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void;
  originalImageUrl: string | null;
  selectedFilter: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImageUrl, selectedFilter }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2">1. Upload your image</label>
      <div
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`
          relative w-full aspect-video border-2 border-dashed rounded-lg flex items-center justify-center
          cursor-pointer transition-all duration-300 group overflow-hidden bg-slate-900/50
          ${isDragging ? 'border-amber-400 bg-amber-500/10' : 'border-slate-700 hover:border-amber-500'}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {originalImageUrl ? (
          <>
            <img 
              src={originalImageUrl} 
              alt="Original preview" 
              className="object-contain w-full h-full transition-all duration-300"
              style={{ filter: filterStyleMap[selectedFilter] || 'none' }}
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-semibold">Click to change image</p>
            </div>
          </>
        ) : (
          <div className="text-center text-slate-500 flex flex-col items-center gap-2 p-4">
            <UploadCloudIcon />
            <p className="font-semibold text-slate-400">Click to upload or drag & drop</p>
            <p className="text-xs">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;