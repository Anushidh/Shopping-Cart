import { ShoppingBag } from 'lucide-react';
import type { Product } from '../types/product';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="card flex flex-col group h-full">
      <div className="aspect-[3/4] w-full overflow-hidden bg-gray-50 relative mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 text-[10px] uppercase tracking-widest bg-white/90 px-2 py-1">
          ★ {product.rating.toFixed(1)}
        </div>
      </div>
      
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xs uppercase tracking-wide text-black line-clamp-2 pr-4">
            {product.title}
          </h3>
          <span className="text-xs font-medium text-black whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <div className="text-[10px] text-gray-500 mb-6 uppercase tracking-widest">
          {product.category}
        </div>
        
        <div className="mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="w-full btn btn-secondary !py-2 text-[10px] gap-2 hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingBag size={14} />
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};
