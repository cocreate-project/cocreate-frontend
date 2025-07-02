import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import { useNavigate } from 'react-router';
import { Header } from '../components/layout/Header';
import { HomeButton } from '../components/features/HomeButton';
import { Button } from '../components/common/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { generateApi } from '../services/api';
import { useEffect, useState } from 'react';
import { GenerationCard } from '../components/common/GenerationCard';

interface Generation {
  id: number;
  type: 'video_script' | 'content_idea' | 'newsletter' | 'thread';
  prompt: string;
  content: string;
  created_at: string;
  saved: boolean;
}

export default function Home() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [recentGenerations, setRecentGenerations] = useState<Generation[]>([]);
  const [savedGenerationIds, setSavedGenerationIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const fetchSavedGenerations = async () => {
    try {
      const response = await generateApi.getSavedGenerations();
      if (response.success && response.saved_generations) {
        const savedIds = new Set(response.saved_generations.map(gen => gen.id));
        setSavedGenerationIds(savedIds);
        return savedIds;
      }
    } catch {
      // Silently fail as this is background sync
    }
    return new Set<number>();
  };

  const fetchRecentGenerations = async (savedIds?: Set<number>) => {
    setIsLoading(true);
    try {
      const response = await generateApi.getAllGenerations();
      if (response.success) {
        const gens = (response.generations || [])
          .sort((a, b) => b.id - a.id)
          .slice(0, 3);
        const idsToUse = savedIds || savedGenerationIds;
        setRecentGenerations(gens.map(gen => ({
          ...gen,
          saved: idsToUse.has(gen.id)
        })));
      }
    } catch {
      // Silently fail as this is not critical
    }
    setIsLoading(false);
  };

  const handleSaveGeneration = async (genId: number) => {
    const response = await generateApi.saveGeneration(genId);
    if (response.success) {
      setSavedGenerationIds(prev => new Set([...prev, genId]));
      setRecentGenerations(prev => prev.map(gen => 
        gen.id === genId ? { ...gen, saved: true } : gen
      ));
    }
  };

  const handleUnsaveGeneration = async (genId: number) => {
    const response = await generateApi.unsaveGeneration(genId);
    if (response.success) {
      setSavedGenerationIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(genId);
        return newSet;
      });
      setRecentGenerations(prev => prev.map(gen => 
        gen.id === genId ? { ...gen, saved: false } : gen
      ));
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const savedIds = await fetchSavedGenerations();
      await fetchRecentGenerations(savedIds);
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Header />
      <div className="flex flex-col gap-4 px-4 w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            Bienvenido de nuevo,{' '}
            <span className="text-blue-500">{user?.username}</span>
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg">¿Qué quieres hacer hoy?</h2>
          <div className="grid grid-cols-2 gap-2">
            <HomeButton
              gradient="#3f83f8"
              icon="mdi:pen"
              title="Generar guión de video"
              onClick={() => {
                navigate('/generate/video-script');
              }}
            />
            <HomeButton
              gradient="#10b981"
              icon="mdi:thought-bubble"
              title="Generar idea de contenido"
              onClick={() => {
                navigate('/generate/content-idea');
              }}
            />
            <HomeButton
              gradient="#f59e0b"
              icon="mdi:email"
              title="Generar newsletter"
              onClick={() => {
                navigate('/generate/newsletter');
              }}
            />
            <HomeButton
              gradient="#ef4444"
              icon="bi:twitter-x"
              title="Generar hilo de X"
              onClick={() => {
                navigate('/generate/thread');
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Generaciones recientes</h2>
            <Button variant="secondary" onClick={() => navigate('/generations')}>
              <Icon icon="mdi:history" className="mr-2" />
              Ver todas
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Icon icon="mdi:loading" className="animate-spin text-4xl" />
            </div>
          ) : recentGenerations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No hay generaciones recientes para mostrar
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {recentGenerations.map((gen) => (
                <GenerationCard
                  key={gen.id}
                  generation={gen}
                  onSave={handleSaveGeneration}
                  onUnsave={handleUnsaveGeneration}
                  showDate={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
