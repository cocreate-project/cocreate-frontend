import { Icon } from '@iconify/react/dist/iconify.js';

interface HomeButtonProps {
  icon: string;
  title: string;
  gradient?: string;
  onClick?: () => void;
}

export default function HomeButton({
  icon,
  title,
  gradient,
  onClick,
}: HomeButtonProps) {
  return (
    <button
      className="flex flex-col gap-1 items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div
        className="h-42 w-full bg-white/10 rounded-md flex items-center justify-center"
        style={{
          background: gradient
            ? `linear-gradient(135deg, ${gradient}40, transparent)`
            : 'rgba(255,255,255,0.1)',
        }}
      >
        <Icon icon={icon} className="text-white/50 text-4xl" />
      </div>
      <span className="text-sm text-white/50">{title}</span>
    </button>
  );
}
