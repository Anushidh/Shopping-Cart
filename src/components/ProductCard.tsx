import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="card flex flex-col group h-full">
      <Link to={`/product/${product.id}`} className="aspect-[3/4] w-full overflow-hidden bg-gray-50 dark:bg-zinc-900 relative mb-4 block">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 text-[10px] uppercase tracking-widest bg-white/90 dark:bg-black/90 px-2 py-1">
          ★ {product.rating.toFixed(1)}
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="hover:opacity-70 transition-opacity pr-4">
            <h3 className="text-xs uppercase tracking-wide text-black dark:text-zinc-100 line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <span className="text-xs font-medium text-black dark:text-zinc-100 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <div className="text-[10px] text-gray-500 dark:text-zinc-400 mb-6 uppercase tracking-widest">
          {product.category}
        </div>
        
        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full btn btn-secondary !py-2 text-[10px] gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <ShoppingBag size={14} />
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};
