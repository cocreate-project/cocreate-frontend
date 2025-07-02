import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import ReactMarkdown from 'react-markdown';
import { generateApi } from '../../services/api';
import { Icon } from '@iconify/react/dist/iconify.js';
import type { ComponentPropsWithoutRef } from 'react';

interface Generation {
  id: number;
  type: 'video_script' | 'content_idea' | 'newsletter' | 'thread';
  prompt: string;
  content: string;
  created_at: string;
  saved: boolean;
}

export default function VideoScript() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [error, setError] = useState('');
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);

  const handleGenerateVideoScript = async () => {
    setIsLoading(true);
    const response = await generateApi.generateVideoScript(prompt);
    if (!response.success) {
      setError(response.message);
    } else {
      setGeneratedScript(response.message);
      // After successful generation, fetch the latest generation
      const allGens = await generateApi.getAllGenerations();
      if (allGens.success && allGens.generations && allGens.generations.length > 0) {
        setCurrentGeneration(allGens.generations[0]);
      }
      setError('');
    }
    setIsLoading(false);
  };

  const handleSaveGeneration = async () => {
    if (!currentGeneration) return;
    
    const response = await generateApi.saveGeneration(currentGeneration.id);
    if (response.success) {
      setCurrentGeneration({ ...currentGeneration, saved: true });
    } else {
      setError(response.message);
    }
  };

  const handleUnsaveGeneration = async () => {
    if (!currentGeneration) return;
    
    const response = await generateApi.unsaveGeneration(currentGeneration.id);
    if (response.success) {
      setCurrentGeneration({ ...currentGeneration, saved: false });
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Header />
      {generatedScript ? (
        <div className="flex flex-col gap-4 pb-6 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => {
              setGeneratedScript('');
              setCurrentGeneration(null);
            }}>
              <Icon icon="mdi:restart" />
            </Button>
            {currentGeneration && (
              <Button
                variant="secondary"
                onClick={currentGeneration.saved ? handleUnsaveGeneration : handleSaveGeneration}
              >
                <Icon icon={currentGeneration.saved ? 'mdi:bookmark' : 'mdi:bookmark-outline'} />
              </Button>
            )}
          </div>
          <ReactMarkdown
            components={{
              code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
                const isInline = !className?.includes('language-');
                return isInline ? (
                  <code
                    className="bg-white/10 px-1 py-0.5 rounded text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    className="block p-1 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-words"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }: ComponentPropsWithoutRef<'pre'>) => (
                <pre className="bg-white/10 p-3 rounded-md overflow-x-auto">
                  {children}
                </pre>
              ),
            }}
          >
            {generatedScript}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-4 w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold flex w-full mb-2  ">
            Generar guión de video
          </h1>
          <textarea
            rows={6}
            className="w-full h-full bg-white/10 outline-none rounded-md p-4 resize-none"
            placeholder="ej. tutorial paso a paso de como hacer una torta de chocolate"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            onClick={handleGenerateVideoScript}
            isLoading={isLoading}
            className="w-full"
          >
            Generar guión
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}
