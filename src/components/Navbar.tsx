import { ShoppingBag, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold tracking-[0.3em] uppercase">
          Brand
        </Link>
        
        <div className="flex items-center gap-6">
          <button onClick={() => setIsDark(!isDark)} className="hover:opacity-70 transition-opacity">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <Link 
            to="/cart" 
            className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">
              CART ({cartItemCount})
            </span>
            <ShoppingBag size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </nav>
  );
};
