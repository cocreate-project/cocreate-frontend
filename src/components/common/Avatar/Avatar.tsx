import { Icon } from "@iconify/react/dist/iconify.js";

export default function Avatar() {
  return (
    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
      <Icon icon="mdi:account" className="text-white/50 text-2xl" />
    </div>
  );
}