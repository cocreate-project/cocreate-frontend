import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import { Button } from '../components/common/Button';
import { Icon } from '@iconify/react';
import { settingsApi } from '../services/api';
import { useNavigate } from 'react-router';

export default function Setup() {
  const [contentType, setContentType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const [user, setUser] = useAtom(userAtom);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      const response = await settingsApi.setContentType(contentType);
      if (response.success) {
        setUser(user ? { ...user, content_type: contentType } : null);
        setStep(2);
      } else {
        setError(response.message);
      }
    }

    if (step === 2) {
      const response = await settingsApi.setTargetAudience(targetAudience);
      if (response.success) {
        setUser(user ? { ...user, target_audience: targetAudience } : null);
        setStep(3);
      } else {
        setError(response.message);
      }
    }

    if (step === 3) {
      const response =
        await settingsApi.setAdditionalContext(additionalContext);
      if (response.success) {
        setUser(
          user ? { ...user, additional_context: additionalContext } : null,
        );
        navigate('/');
      } else {
        setError(response.message);
      }
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
    <div className="flex flex-col items-center gap-2 px-4 justify-center h-full w-full">
      <h1 className="text-2xl font-bold">¡Bienvenido a CoCreate!</h1>
      {step === 1 && (
        <p className="text-sm text-white/50">
          Para comenzar, cuentanos cual es tu{' '}
          <span className="text-white">tipo de contenido</span>:
        </p>
      )}

      {step === 2 && (
        <p className="text-sm text-white/50">
          Ahora, cuentanos cual es tu{' '}
          <span className="text-white">público objetivo</span>:
        </p>
      )}

      {step === 3 && (
        <p className="text-sm text-white/50">
          Opcionalmente, tienes algo mas que decirnos como{' '}
          <span className="text-white">contexto adicional</span>?
        </p>
      )}
      <div className="flex flex-col gap-2 w-full items-center md:w-96">
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <textarea
            value={
              step === 1
                ? contentType
                : step === 2
                  ? targetAudience
                  : additionalContext
            }
            onChange={(e) =>
              step === 1
                ? setContentType(e.target.value)
                : step === 2
                  ? setTargetAudience(e.target.value)
                  : setAdditionalContext(e.target.value)
            }
            placeholder={
              step === 1
                ? 'ej. tutoriales de javascript en español'
                : step === 2
                  ? 'ej. estudiantes de ingeniería'
                  : 'ej. tengo un curso de python que quiero promocionar cuando sea apropiado'
            }
            className="w-full h-40 p-2 resize-none rounded-md border border-white/20"
          ></textarea>
          <div className="flex w-full gap-2">
            {step === 3 && (
              <Button variant="secondary" size="sm" className="w-full gap-1.5">
                Saltar
                <Icon icon="mdi:arrow-right" />
              </Button>
            )}
            <Button variant="primary" size="sm" className="w-full gap-1.5">
              Continuar
              <Icon icon="mdi:arrow-right" />
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
