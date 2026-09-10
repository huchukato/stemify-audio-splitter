import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { StemCard } from './components/StemCard';
import { uploadAudio, checkServerStatus, cleanupSession } from './lib/api';
import { Music4, Wand2, Sparkles, Download, Music2, Gauge } from 'lucide-react';

interface Stem {
  name: string;
  url: string;
  color: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stems, setStems] = useState<Stem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{ bpm: number | null; key: string | null } | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');

  // Aggiungi questo useEffect
  useEffect(() => {
    const checkServer = async () => {
      const isServerUp = await checkServerStatus();
      if (!isServerUp) {
        setError('Server is currently unavailable. Please try again later.');
      }
    };

    checkServer();
  }, []); // Array vuoto significa che verrà eseguito solo all'avvio

  // Modificata la funzione per accettare direttamente il File
  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      setProgress(0);
      setProgressMessage('');

      // Cleanup della sessione precedente se esiste
      if (currentSessionId) {
        await cleanupSession(currentSessionId);
      }

      const result = await uploadAudio(file, (pct, msg) => {
        setProgress(pct);
        setProgressMessage(msg);
      });

      // Salva il nuovo session_id e pulisce quello vecchio
      setCurrentSessionId(result.session_id);
      setAnalysis(result.analysis);

      setStems([
        { name: 'Vocals', url: result.vocals, color: 'bg-pink-500' },
        { name: 'Drums', url: result.drums, color: 'bg-purple-500' },
        { name: 'Bass', url: result.bass, color: 'bg-blue-500' },
        { name: 'Instrumental', url: result.instrumental, color: 'bg-green-500' }
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process audio');
      setStems([]);
      setAnalysis(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    if (currentSessionId) {
      window.open(`${API_URL}/download-all/${currentSessionId}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {stems.length === 0 && !isProcessing && (
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Separate Your Music into Stems
            </h2>
            <p className="text-gray-300 mb-12 text-lg">
              Upload your music and let AI split it into individual components using the power of Demucs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
                <div className="bg-pink-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Wand2 className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
                <p className="text-gray-400 text-sm">
                  Advanced neural network trained on thousands of songs
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
                <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">High Quality</h3>
                <p className="text-gray-400 text-sm">
                  Professional-grade stem separation for your music
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Music4 className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Four Stems</h3>
                <p className="text-gray-400 text-sm">
                  Separate vocals, drums, bass, and other instruments
                </p>
              </div>
            </div>
          </div>
        )}

        <FileUpload
          isProcessing={isProcessing}
          onFileUpload={handleFileUpload}
          progress={progress}
          progressMessage={progressMessage}
        />
        
        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-500/20 border border-red-500 rounded-lg text-center">
            {error}
          </div>
        )}
        
        {stems.length > 0 && (
          <>
            {/* Analisi BPM e chiave */}
            {analysis && (analysis.bpm || analysis.key) && (
              <div className="max-w-4xl mx-auto mt-8 mb-4 flex flex-wrap gap-4 justify-center">
                {analysis.bpm && (
                  <div className="bg-gray-800/80 rounded-xl px-6 py-4 flex items-center gap-3 backdrop-blur-sm">
                    <Gauge className="w-6 h-6 text-pink-500" />
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">BPM</div>
                      <div className="text-2xl font-bold">{analysis.bpm}</div>
                    </div>
                  </div>
                )}
                {analysis.key && (
                  <div className="bg-gray-800/80 rounded-xl px-6 py-4 flex items-center gap-3 backdrop-blur-sm">
                    <Music2 className="w-6 h-6 text-purple-500" />
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Key</div>
                      <div className="text-2xl font-bold">{analysis.key}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottone Scarica tutti */}
            <div className="max-w-4xl mx-auto mt-4 mb-2 flex justify-center">
              <button
                onClick={handleDownloadAll}
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-pink-500/20"
              >
                <Download className="w-5 h-5" />
                Download all stems (ZIP)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-4">
              {stems.map((stem) => (
                <StemCard key={stem.name} {...stem} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}