import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import Button from './components/Button';
import EffectSelector, { Effect } from './components/EffectSelector';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { polarizeImage } from './services/geminiService';
import { toBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<Effect>('Classic');

  const handleImageUpload = useCallback(async (file: File) => {
    setOriginalFile(file);
    setGeneratedImage(null);
    setError(null);
    setSelectedEffect('Classic');
    try {
      const base64Preview = await toBase64(file);
      setOriginalImagePreview(base64Preview);
    } catch (err) {
      setError('Oops! We couldn\'t read that picture. Please try another one!');
      setOriginalImagePreview(null);
      setOriginalFile(null);
    }
  }, []);

  const handleGeneratePolaroid = useCallback(async () => {
    if (!originalImagePreview) {
      setError('Please pick a photo first!');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await polarizeImage(originalImagePreview, selectedEffect);
      setGeneratedImage(result);
    } catch (err) {
        if (err instanceof Error) {
            setError(`Oh no! Something went wrong: ${err.message}. Maybe try again?`);
        } else {
            setError('An unknown error happened. Please try again!');
        }
    } finally {
      setIsLoading(false);
    }
  }, [originalImagePreview, selectedEffect]);

  const handleReset = useCallback(() => {
    setOriginalFile(null);
    setOriginalImagePreview(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
    setSelectedEffect('Classic');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-rose-100 to-amber-100 text-gray-700 flex flex-col items-center p-4 transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <Header />

        <main className="w-full mt-8 flex flex-col items-center">
          {!originalImagePreview && (
            <ImageUploader onImageUpload={handleImageUpload} />
          )}

          {originalImagePreview && (
            <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-8">
              <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your Picture</h2>
                <div className="bg-white p-3 rounded-xl shadow-lg">
                    <img src={originalImagePreview} alt="Original upload" className="rounded-lg max-w-full h-auto max-h-96" />
                </div>
                {!isLoading && !generatedImage && (
                    <>
                        <EffectSelector selectedEffect={selectedEffect} onSelectEffect={setSelectedEffect} />
                        <Button onClick={handleGeneratePolaroid} className="mt-6" disabled={isLoading}>
                            <SparklesIcon className="w-6 h-6 mr-2" />
                            {isLoading ? 'Working Magic...' : 'Make it a Polaroid!'}
                        </Button>
                    </>
                )}
              </div>

              <div className="w-full lg:w-1/2 flex flex-col items-center text-center">
                {isLoading && <Loader />}
                {error && <div className="mt-6 text-red-600 bg-red-100 p-4 rounded-lg font-medium">{error}</div>}
                {generatedImage && <ResultDisplay imageUrl={generatedImage} originalFile={originalFile} />}
              </div>
            </div>
          )}

          {originalImagePreview && (
            <button
              onClick={handleReset}
              className="mt-12 text-gray-500 hover:text-orange-500 transition-colors font-medium underline"
            >
              Choose a Different Picture
            </button>
          )}

        </main>
      </div>
    </div>
  );
};

export default App;