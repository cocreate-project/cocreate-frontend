import { RouteObject } from 'react-router';
import VideoScript from '../views/generate/VideoScript';  

const generateRoutes: RouteObject[] = [
  {
    path: '/generate/video-script',
    Component: VideoScript,
  },
  {
    path: '/generate/content-idea',
  },
  {
    path: '/generate/newsletter',
  },
  {
    path: '/generate/thread',
  },
];

export default generateRoutes;
