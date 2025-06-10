import { Icon } from '@iconify/react/dist/iconify.js';

interface HomeButtonProps {
  icon: string;
  title: string;
}

export default function HomeButton({ icon, title }: HomeButtonProps) {
  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <div className="h-42 w-full bg-white/10 rounded-md flex items-center justify-center">
        <Icon icon={icon} className="text-white/50 text-2xl" />
      </div>
      <span className="text-sm text-white/50">{title}</span>
    </div>
  );
}
