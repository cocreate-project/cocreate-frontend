import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Link } from 'react-router';
import { authApi } from '../services/api';
import { authValidation } from '../services/validations';
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useSetAtom(userAtom);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const loginValidation = authValidation.validateLogin(username, password);
    if (!loginValidation.success) {
      setError(loginValidation.message);
      setIsLoading(false);
      return;
    }

    const response = await authApi.login(username, password);
    if (response.success) {
      setUser(response.user);
      navigate('/');
      setError('');
    } else {
      setError(response.message);
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
    <div className="flex flex-col items-center gap-2 justify-center h-full w-full px-4">
      <div className="border border-white/20 p-4 rounded-lg w-full md:min-w-96 flex flex-col items-center justify-center gap-4">
        <span className="text-2xl font-bold w-full">CoCreate</span>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleLogin}>
          <Input
            placeholder="usuario"
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="*************"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="primary"
            size="sm"
            isLoading={isLoading}
            type="submit"
          >
            Iniciar sesión
          </Button>
        </form>
        {error && <span className="text-red-500">{error}</span>}
      </div>
      <div className="flex gap-1 w-full items-center justify-center">
        <span className="text-white/50">¿No tienes una cuenta?</span>
        <Link to="/register" className="text-blue-500 font-medium">
          Registrate
        </Link>
      </div>
    </div>
  );
}
