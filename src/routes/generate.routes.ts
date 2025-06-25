import { RouteObject } from 'react-router';
import VideoScript from '../views/generate/VideoScript';  
import ContentIdea from '../views/generate/ContentIdea';
import Newsletter from '../views/generate/Newsletter';
import Thread from '../views/generate/Thread';

const generateRoutes: RouteObject[] = [
  {
    path: '/generate/video-script',
    Component: VideoScript,
  },
  {
    path: '/generate/content-idea',
    Component: ContentIdea,
  },
  {
    path: '/generate/newsletter',
    Component: Newsletter,
  },
  {
    path: '/generate/thread',
    Component: Thread,
  },
];

export default generateRoutes;
