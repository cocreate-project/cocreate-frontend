import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { authHelper } from "../../../services/helpers";
import { useSetAtom } from "jotai";
import { userAtom } from "../../../atoms/userAtoms";

export default function Avatar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  const handleLogout = () => {
    authHelper.removeAccessToken();
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Icon icon="mdi:account" className="text-white/50 text-2xl" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black bg-surface border border-white/20">
          <div className="py-1">
            <button
              onClick={() => {
                navigate('/settings');
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/50 hover:bg-white/10 w-full text-left"
            >
              <Icon icon="mdi:cog" />
              Configuración
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-white/10 w-full text-left"
            >
              <Icon icon="mdi:logout" />
              Salir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}