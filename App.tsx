import React, { useState, useCallback } from 'react';
import { editImageWithGemini } from './services/geminiService';
import { fileToBase64, applyFilterAndConvertToBase64 } from './utils/fileUtils';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import PromptInput from './components/PromptInput';
import Header from './components/Header';
import Button from './components/Button';
import FilterSelector from './components/FilterSelector';
import { BananaIcon, SparklesIcon, AlertTriangleIcon } from './components/Icons';

export default function App() {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [apiResponseText, setApiResponseText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setOriginalImageFile(file);
      setOriginalImageUrl(URL.createObjectURL(file));
      setEditedImageUrl(null);
      setError(null);
      setSelectedFilter('none');
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImageFile || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);
    setApiResponseText('');

    try {
      const mimeType = originalImageFile.type;
      
      const base64Data = selectedFilter === 'none'
        ? await fileToBase64(originalImageFile)
        : await applyFilterAndConvertToBase64(originalImageFile, selectedFilter);
      
      const result = await editImageWithGemini(base64Data, mimeType, prompt);
      
      if (result.imageUrl) {
        setEditedImageUrl(result.imageUrl);
        setApiResponseText(result.text || 'Image generated successfully.');
      } else {
        throw new Error(result.text || 'Image generation failed. The model may have returned only text.');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to edit image. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, prompt, selectedFilter]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Control Panel */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col gap-6 sticky top-24 border border-slate-700">
          <h2 className="text-2xl font-bold text-amber-300 flex items-center gap-2">
            <SparklesIcon />
            Create Your Magic
          </h2>
          <ImageUploader 
            onImageUpload={handleImageUpload} 
            originalImageUrl={originalImageUrl} 
            selectedFilter={selectedFilter}
          />
          <FilterSelector 
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
            disabled={!originalImageFile}
          />
          <PromptInput prompt={prompt} setPrompt={setPrompt} disabled={!originalImageFile} />
          <Button 
            onClick={handleGenerateClick} 
            disabled={!originalImageFile || !prompt || isLoading} 
            isLoading={isLoading} 
          />
          {error && (
            <div className="bg-red-500/10 text-red-300 border border-red-500/30 p-3 rounded-lg flex items-start gap-3">
              <AlertTriangleIcon />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Result Display */}
        <div className="lg:col-span-3 bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg min-h-[400px] lg:min-h-[600px] flex flex-col items-center justify-center border border-slate-700">
          <ResultDisplay
            isLoading={isLoading}
            editedImageUrl={editedImageUrl}
            apiResponseText={apiResponseText}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Gemini & React. Crafted with <BananaIcon className="inline-block w-4 h-4 -mt-1" /> by a World-Class AI Engineer.</p>
      </footer>
    </div>
  );
}