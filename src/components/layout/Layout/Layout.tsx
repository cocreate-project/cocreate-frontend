import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { userAtom, isUserDataLoadingAtom } from '../../../atoms/userAtoms';
import { userApi } from '../../../services/api';

export default function Layout() {
  const [user, setUser] = useAtom(userAtom);
  const [isUserDataLoading, setIsUserDataLoading] = useAtom(
    isUserDataLoadingAtom,
  );

  const navigate = useNavigate();
  const location = useLocation();

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
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      console.log(location.pathname);
      console.log(user);
      console.log(isUserDataLoading);
      if (!user && !isUserDataLoading) {
        navigate('/login');
        return;
      }

      if (
        user &&
        !isUserDataLoading &&
        (user?.content_type.trim() === '' ||
          user?.target_audience.trim() === '')
      ) {
        navigate('/setup');
      }
    }
  }, [user, isUserDataLoading, location.pathname]);

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Outlet />
    </div>
  );
}
