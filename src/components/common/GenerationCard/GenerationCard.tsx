import { Button } from '../Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import ReactMarkdown from 'react-markdown';
import { Avatar } from '../Avatar';
import { useAtom } from 'jotai';
import { userAtom } from '../../../atoms/userAtoms';
import { useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

interface Generation {
  id: number;
  type: 'video_script' | 'content_idea' | 'newsletter' | 'thread';
  prompt: string;
  content: string;
  created_at: string;
  saved: boolean;
}

interface NewsletterContent {
  subject: string;
  title: string;
  content: string[];
}

interface GenerationCardProps {
  generation: Generation;
  onSave: (id: number) => void;
  onUnsave: (id: number) => void;
  showDate?: boolean;
}

export default function GenerationCard({ generation, onSave, onUnsave }: GenerationCardProps) {
  const [user] = useAtom(userAtom);
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeLabel = (type: Generation['type']) => {
    switch (type) {
      case 'video_script':
        return 'Guión de video';
      case 'content_idea':
        return 'Idea de contenido';
      case 'newsletter':
        return 'Newsletter';
      case 'thread':
        return 'Hilo de X';
      default:
        return type;
    }
  };

  const truncateText = (text: string, maxLength: number = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderContent = () => {
    if (generation.type === 'newsletter') {
      try {
        const newsletterData: NewsletterContent = JSON.parse(generation.content);
        const fullContent = newsletterData.content.join('\n\n');
        const contentToShow = isExpanded ? fullContent : truncateText(fullContent);
        
        return (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold flex w-full mb-2">
              {newsletterData.title}
            </h1>
            <span className="text-sm text-gray-500">
              {newsletterData.subject}
            </span>
            <ReactMarkdown
              components={{
                code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
                  const isInline = !className?.includes('language-');
                  return isInline ? (
                    <code className="bg-white/10 px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block p-1 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-words" {...props}>
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
              {contentToShow}
            </ReactMarkdown>
            {fullContent.length > 300 && (
              <Button
                variant="secondary"
                onClick={() => setIsExpanded(!isExpanded)}
                className="self-start"
              >
                <Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="mr-2" />
                {isExpanded ? 'Ver menos' : 'Ver más'}
              </Button>
            )}
          </div>
        );
      } catch {
        // Fallback to regular markdown if parsing fails
        const contentToShow = isExpanded ? generation.content : truncateText(generation.content);
        return (
          <div className="flex flex-col gap-4">
            <ReactMarkdown
              components={{
                code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
                  const isInline = !className?.includes('language-');
                  return isInline ? (
                    <code className="bg-white/10 px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block p-1 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-words" {...props}>
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
              {contentToShow}
            </ReactMarkdown>
            {generation.content.length > 300 && (
              <Button
                variant="secondary"
                onClick={() => setIsExpanded(!isExpanded)}
                className="self-start"
              >
                <Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="mr-2" />
                {isExpanded ? 'Ver menos' : 'Ver más'}
              </Button>
            )}
          </div>
        );
      }
    }

    if (generation.type === 'thread') {
      try {
        const threadData: string[] = JSON.parse(generation.content);
        const threadsToShow = isExpanded ? threadData : threadData.slice(0, 2);
        
        return (
          <div className="flex flex-col gap-4">
            {threadsToShow.map((thread: string, index: number) => (
              <div
                className="relative flex flex-col items-start gap-2 border border-white/20 rounded-md p-4"
                key={index}
              >
                <div className="flex items-center gap-2">
                  <Avatar />
                  <span>{user?.username}</span>
                </div>
                <ReactMarkdown>{thread}</ReactMarkdown>
                {index < threadsToShow.length - 1 && (
                  <div className="absolute -bottom-4 w-px h-4 bg-white/20" />
                )}
              </div>
            ))}
            {threadData.length > 2 && (
              <Button
                variant="secondary"
                onClick={() => setIsExpanded(!isExpanded)}
                className="self-start"
              >
                <Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="mr-2" />
                {isExpanded ? 'Ver menos' : `Ver ${threadData.length - 2} tweets más`}
              </Button>
            )}
          </div>
        );
      } catch {
        // Fallback to regular markdown if parsing fails
        const contentToShow = isExpanded ? generation.content : truncateText(generation.content);
        return (
          <div className="flex flex-col gap-4">
            <ReactMarkdown
              components={{
                code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
                  const isInline = !className?.includes('language-');
                  return isInline ? (
                    <code className="bg-white/10 px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block p-1 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-words" {...props}>
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
              {contentToShow}
            </ReactMarkdown>
            {generation.content.length > 300 && (
              <Button
                variant="secondary"
                onClick={() => setIsExpanded(!isExpanded)}
                className="self-start"
              >
                <Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="mr-2" />
                {isExpanded ? 'Ver menos' : 'Ver más'}
              </Button>
            )}
          </div>
        );
      }
    }

    // For video_script and content_idea, use regular markdown (same as their views)
    const contentToShow = isExpanded ? generation.content : truncateText(generation.content);
    
    return (
      <div className="flex flex-col gap-4">
        <ReactMarkdown
          components={{
            code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
              const isInline = !className?.includes('language-');
              return isInline ? (
                <code className="bg-white/10 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              ) : (
                <code className="block p-1 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-words" {...props}>
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
          {contentToShow}
        </ReactMarkdown>
        {generation.content.length > 300 && (
          <Button
            variant="secondary"
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-start"
          >
            <Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="mr-2" />
            {isExpanded ? 'Ver menos' : 'Ver más'}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white/10 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-xl font-semibold">
            {getTypeLabel(generation.type)}
          </span>
          <h3 className="text-lg font-medium">{generation.prompt}</h3>
        </div>
        <Button
          variant="secondary"
          onClick={() => generation.saved ? onUnsave(generation.id) : onSave(generation.id)}
          title={generation.saved ? 'Quitar de guardados' : 'Guardar'}
        >
          <Icon icon={generation.saved ? 'mdi:bookmark' : 'mdi:bookmark-outline'} />
        </Button>
      </div>
      {renderContent()}
    </div>
  );
} 