import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtoms';
import { Avatar } from '../../components/common/Avatar';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { generateApi } from '../../services/api';
import { Icon } from '@iconify/react/dist/iconify.js';
import Markdown from 'react-markdown';

export default function Thread() {
  const [user] = useAtom(userAtom);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedThread, setGeneratedThread] = useState<any>(null);
  const [error, setError] = useState('');

  const handleGenerateThread = async () => {
    setIsLoading(true);
    const response = await generateApi.generateThread(prompt);
    console.log(response);
    if (!response.success) {
      setError(response.message);
    } else {
      setGeneratedThread(response.message);
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
      {generatedThread ? (
        <div className="flex flex-col gap-4 pb-6 px-4 max-w-4xl mx-auto">
          <div className="flex items-center">
            <Button variant="secondary" onClick={() => setGeneratedThread('')}>
              <Icon icon="mdi:restart" />
            </Button>
          </div>
          {generatedThread.map((thread: string, index: number) => (
            <div
              className="relative flex flex-col items-start gap-2 border border-white/20 rounded-md p-4"
              key={thread}
            >
              <div className="flex items-center gap-2">
                <Avatar />
                <span>{user?.username}</span>
              </div>
              <Markdown>{thread}</Markdown>
              {index < generatedThread.length - 1 && (
                <div className="absolute -bottom-4 w-px h-4 bg-white/20" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-4 w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold flex w-full mb-2  ">
            Generar Hilo de X
          </h1>
          <textarea
            rows={6}
            className="w-full h-full bg-white/10 outline-none rounded-md p-4 resize-none"
            placeholder="ej. hilo explicando una funcionalidad poco conocida pero muy util de JavaScript"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            onClick={handleGenerateThread}
            isLoading={isLoading}
            className="w-full"
          >
            Generar hilo
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}
