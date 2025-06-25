import { createBrowserRouter } from 'react-router';
import publicRoutes from './public.routes';
import generateRoutes from './generate.routes';
import { Layout } from '../components/layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [...publicRoutes, ...generateRoutes],
  },
]);

export default router;
