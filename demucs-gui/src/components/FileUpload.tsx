import React, { useCallback } from 'react';
import { Upload, Music4 } from 'lucide-react';

interface FileUploadProps {
  isProcessing: boolean;
  onFileUpload: (file: File) => void;
  progress: number;
  progressMessage: string;
}

export function FileUpload({ isProcessing, onFileUpload, progress, progressMessage }: FileUploadProps) {
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isProcessing) return;

      const files = Array.from(e.dataTransfer.files);
      const mp3File = files.find(file => file.type === 'audio/mpeg');

      if (mp3File && mp3File.size <= MAX_FILE_SIZE) { // 20MB limit
        onFileUpload(mp3File);
      } else {
        alert('Please upload an MP3 file under 20MB');
      }
    },
    [isProcessing, onFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.size <= MAX_FILE_SIZE) { // 20MB limit
        onFileUpload(file);
      } else {
        alert('Please upload an MP3 file under 20MB');
      }
    },
    [onFileUpload]
  );

  return (
    <div className="max-w-xl mx-auto mb-12">
      <div
        className={`
          flex flex-col items-center justify-center w-full h-64
          border-2 border-dashed rounded-xl
          ${isProcessing ? 'border-gray-600 bg-gray-800/50' : 'border-pink-500 hover:bg-gray-800/50 cursor-pointer'}
          transition-all duration-300 backdrop-blur-sm
        `}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isProcessing ? (
            <>
              <div className="relative mb-4">
                <Music4 className="w-12 h-12 text-pink-500 animate-pulse" />
              </div>
              <p className="text-2xl font-semibold mb-2">Processing your track</p>
              <p className="text-sm text-gray-400 mb-4">{progressMessage || 'This may take a few minutes'}</p>

              {/* Progress bar */}
              <div className="w-72 max-w-full px-4">
                <div className="w-full bg-gray-600 rounded-lg h-5 overflow-hidden border border-gray-500">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-center mt-2 text-sm font-semibold text-pink-400">
                  {progress}%
                </p>
              </div>
            </>
          ) : (
            <>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="audio/mpeg"
                onChange={handleFileSelect}
                disabled={isProcessing}
              />
              <div
                className="bg-pink-500/10 p-4 rounded-xl mb-4 cursor-pointer"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="w-12 h-12 text-pink-500" />
              </div>
              <p className="text-2xl font-semibold mb-2">Drop your track here</p>
              <p className="text-sm text-gray-400 mb-2">MP3 files up to 20MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
