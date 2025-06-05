import { RouterProvider } from 'react-router';
import router from './routes';

export default function App() {
  return (
    <div className="bg-black h-[100dvh] text-white">
      <RouterProvider router={router} />
    </div>
  );
}
