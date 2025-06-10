import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { userAtom, isUserDataLoadingAtom } from '../atoms/userAtoms';
import { useNavigate } from 'react-router';
import { userApi } from '../services/api';
import Header from '../components/layout/Header';

export default function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [isUserDataLoading, setIsUserDataLoading] = useAtom(
    isUserDataLoadingAtom,
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await userApi.getUser();
      if (response.success) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    };
    fetchUser();
    setIsUserDataLoading(false);
  }, []);

  useEffect(() => {
    if (!user && !isUserDataLoading) {
      navigate('/login');
      return;
    }

    if (
      user &&
      !isUserDataLoading &&
      (user?.content_type.trim() === '' || user?.target_audience.trim() === '')
    ) {
      navigate('/setup');
    }
  }, [user, isUserDataLoading]);

  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <Header />
    </div>
  );
}
