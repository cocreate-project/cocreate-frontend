import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import ReactMarkdown from 'react-markdown';
import { generateApi } from '../../services/api';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ContentIdea() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [error, setError] = useState('');

  const handleGenerateContentIdea = async () => {
    setIsLoading(true);
    const response = await generateApi.generateContentIdea(prompt);
    console.log(response);
    if (!response.success) {
      setError(response.message);
    } else {
      setGeneratedIdea(response.message);
      setError('');
    }
    setIsLoading(false);
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
      {generatedIdea ? (
        <div className="flex flex-col gap-4 pb-6 px-4 max-w-4xl mx-auto">
          <div className="flex items-center">
            <Button variant="secondary" onClick={() => setGeneratedIdea('')}>
              <Icon icon="mdi:restart" />
            </Button>
          </div>
          <ReactMarkdown
            components={{
              code: ({ className, children, ...props }: any) => {
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
              pre: ({ children }: any) => (
                <pre className="bg-white/10 p-3 rounded-md overflow-x-auto">
                  {children}
                </pre>
              ),
            }}
          >
            {generatedIdea}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-4 w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold flex w-full mb-2  ">
            Generar ideas de contenido
          </h1>
          <textarea
            rows={6}
            className="w-full h-full bg-white/10 outline-none rounded-md p-4 resize-none"
            placeholder="ej. ideas de tips de Python para principiantes"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            onClick={handleGenerateContentIdea}
            isLoading={isLoading}
            className="w-full"
          >
            Generar idea
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}
