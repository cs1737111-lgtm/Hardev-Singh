import React from 'react';
import { ImageIcon, LoaderIcon } from './Icons';

interface ResultDisplayProps {
  isLoading: boolean;
  editedImageUrl: string | null;
  apiResponseText: string;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-slate-400 animate-pulse">
        <LoaderIcon className="w-12 h-12 text-amber-500" />
        <p className="font-semibold text-lg text-slate-300">Conjuring pixels...</p>
        <p className="text-sm text-slate-500">This can take a moment.</p>
    </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-slate-500 text-center">
        <ImageIcon className="w-16 h-16 text-slate-700" />
        <h3 className="text-xl font-bold text-slate-400">Your Edited Image Will Appear Here</h3>
        <p className="max-w-xs">Upload an image, apply a filter, and provide a prompt to begin the magic.</p>
    </div>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, editedImageUrl, apiResponseText }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (editedImageUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-4">
        <div className="w-full aspect-video bg-black/50 rounded-lg overflow-hidden flex items-center justify-center">
             <img src={editedImageUrl} alt="Edited result" className="object-contain max-w-full max-h-full" />
        </div>
        {apiResponseText && (
            <p className="text-center text-slate-300 bg-slate-900/50 p-3 rounded-md text-sm w-full border border-slate-700">{apiResponseText}</p>
        )}
      </div>
    );
  }

  return <Placeholder />;
};

export default ResultDisplay;