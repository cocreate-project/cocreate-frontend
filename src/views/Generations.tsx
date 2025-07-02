import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Button, ButtonGroup } from '../components/common/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { generateApi } from '../services/api';
import { GenerationCard } from '../components/common/GenerationCard';

interface Generation {
  id: number;
  type: 'video_script' | 'content_idea' | 'newsletter' | 'thread';
  prompt: string;
  content: string;
  created_at: string;
  saved: boolean;
}

export default function Generations() {
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [savedGenerationIds, setSavedGenerationIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const fetchGenerations = async (savedIds?: Set<number>) => {
    setIsLoading(true);
    try {
      const response = activeTab === 'all' 
        ? await generateApi.getAllGenerations()
        : await generateApi.getSavedGenerations();

      if (response.success) {
        if (activeTab === 'all') {
          // For "all" tab, mark generations as saved based on savedGenerationIds
          const gens = (response.generations || [])
            .sort((a, b) => b.id - a.id); // Sort by ID in descending order (newest first)
          const idsToUse = savedIds || savedGenerationIds;
          setGenerations(gens.map(gen => ({
            ...gen,
            saved: idsToUse.has(gen.id)
          })));
        } else {
          // In saved tab, all generations are saved
          const gens = (response.saved_generations || [])
            .sort((a, b) => b.id - a.id); // Sort by ID in descending order (newest first)
          setGenerations(gens.map(gen => ({
            ...gen,
            saved: true
          })));
        }
        setError('');
      } else {
        if (activeTab === 'saved' && response.message === "No se encontraron generaciones favoritas para este usuario") {
          setGenerations([]);
        } else {
          setError(response.message);
        }
      }
    } catch {
      setError('Error al cargar las generaciones');
    }
    setIsLoading(false);
  };

  const handleSaveGeneration = async (genId: number) => {
    const response = await generateApi.saveGeneration(genId);
    if (response.success) {
      setSavedGenerationIds(prev => new Set([...prev, genId]));
      if (activeTab === 'all') {
        setGenerations(prev => prev.map(gen => 
          gen.id === genId ? { ...gen, saved: true } : gen
        ));
      } else {
        fetchGenerations();
      }
    } else {
      setError(response.message);
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
      if (activeTab === 'all') {
        setGenerations(prev => prev.map(gen => 
          gen.id === genId ? { ...gen, saved: false } : gen
        ));
      } else {
        fetchGenerations();
      }
    } else {
      setError(response.message);
    }
  };

  const handleExport = async () => {
    const response = await generateApi.exportGenerations();
    if (response.success) {
      // Create a JSON file and trigger download
      const blob = new Blob([JSON.stringify(response.generations, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generaciones_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (activeTab === 'all') {
        // When switching to "all" tab, fetch saved generations first
        const savedIds = await fetchSavedGenerations();
        await fetchGenerations(savedIds);
      } else {
        await fetchGenerations();
      }
    };
    loadData();
  }, [activeTab]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(''), 3000);
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Header />
      <div className="flex flex-col gap-4 px-4 w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Mis generaciones</h1>
          <Button variant="secondary" onClick={handleExport}>
            <Icon icon="mdi:download" className="mr-2" />
            Exportar
          </Button>
        </div>

        <ButtonGroup className="w-fit">
          <Button
            onClick={() => setActiveTab('all')}
            selected={activeTab === 'all'}
          >
            Todas
          </Button>
          <Button
            onClick={() => setActiveTab('saved')}
            selected={activeTab === 'saved'}
          >
            Guardadas
          </Button>
        </ButtonGroup>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Icon icon="mdi:loading" className="animate-spin text-4xl" />
          </div>
        ) : generations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {activeTab === 'saved' ? 'No tienes generaciones guardadas' : 'No hay generaciones para mostrar'}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {generations.map((gen) => (
              <GenerationCard
                key={gen.id}
                generation={gen}
                onSave={handleSaveGeneration}
                onUnsave={handleUnsaveGeneration}
                showDate={false}
              />
            ))}
          </div>
        )}

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 