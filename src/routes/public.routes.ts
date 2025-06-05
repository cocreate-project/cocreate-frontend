import { RouteObject } from 'react-router';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Setup from '../views/Setup';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/setup',
    Component: Setup,
  },
];

export default publicRoutes;
