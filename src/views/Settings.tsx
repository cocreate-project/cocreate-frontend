import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import { Button } from '../components/common/Button';
import { Icon } from '@iconify/react';
import { settingsApi } from '../services/api';
import { Header } from '../components/layout/Header';

export default function Settings() {
  const [contentType, setContentType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (user) {
      setContentType(user.content_type || '');
      setTargetAudience(user.target_audience || '');
      setAdditionalContext(user.additional_context || '');
    }
  }, [user]);

  const handleUpdateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Update content type
      const contentTypeResponse = await settingsApi.setContentType(contentType);
      if (!contentTypeResponse.success) {
        setError(contentTypeResponse.message);
        setIsLoading(false);
        return;
      }

      // Update target audience
      const targetAudienceResponse =
        await settingsApi.setTargetAudience(targetAudience);
      if (!targetAudienceResponse.success) {
        setError(targetAudienceResponse.message);
        setIsLoading(false);
        return;
      }

      // Update additional context
      const additionalContextResponse =
        await settingsApi.setAdditionalContext(additionalContext);
      if (!additionalContextResponse.success) {
        setError(additionalContextResponse.message);
        setIsLoading(false);
        return;
      }

      // Update user state
      setUser(
        user
          ? {
              ...user,
              content_type: contentType,
              target_audience: targetAudience,
              additional_context: additionalContext,
            }
          : null,
      );

      setSuccessMessage('Configuración actualizada correctamente!');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al actualizar la configuración',
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  }, [error, successMessage]);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Header />
      <div className="flex flex-col items-center gap-4 px-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold">Configuración</h1>
        <div className="flex flex-col gap-2 w-full items-center md:w-96">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleUpdateSettings}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/50">
                Tipo de contenido:
              </label>
              <textarea
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                placeholder="ej. tutoriales de javascript en español"
                className="w-full h-32 p-2 resize-none rounded-md border border-white/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/50">Público objetivo:</label>
              <textarea
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="ej. estudiantes de ingeniería"
                className="w-full h-32 p-2 resize-none rounded-md border border-white/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/50">
                Contexto adicional:
              </label>
              <textarea
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="ej. tengo un curso de python que quiero promocionar cuando sea apropiado"
                className="w-full h-32 p-2 resize-none rounded-md border border-white/20"
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              className="w-full gap-1.5"
              isLoading={isLoading}
            >
              <Icon icon="mdi:content-save" />
              Guardar cambios
            </Button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}
