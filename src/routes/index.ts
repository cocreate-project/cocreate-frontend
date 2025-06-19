import { createBrowserRouter } from 'react-router';
import publicRoutes from './public.routes';
import generateRoutes from './generate.routes';

const router = createBrowserRouter([...publicRoutes, ...generateRoutes]);

export default router;
