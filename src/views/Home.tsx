import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import { useNavigate } from 'react-router';
import { Header } from '../components/layout/Header';
import { HomeButton } from '../components/features/HomeButton';

export default function Home() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

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
      </div>
    </div>
  );
}
