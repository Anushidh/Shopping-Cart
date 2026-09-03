import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { useCartStore } from '../../store/useCartStore';
import { ArrowLeft, ShoppingBag, AlertCircle } from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-12">
        <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 animate-pulse mb-8"></div>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <div className="w-full md:w-1/2 aspect-[3/4] flex gap-4">
            <div className="hidden md:flex flex-col gap-4 w-20 flex-shrink-0">
              <div className="w-20 h-24 bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
              <div className="w-20 h-24 bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
              <div className="w-20 h-24 bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
            </div>
            <div className="flex-grow bg-gray-200 dark:bg-zinc-800 animate-pulse h-full"></div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 animate-pulse mb-4"></div>
            <div className="h-12 w-3/4 bg-gray-200 dark:bg-zinc-800 animate-pulse mb-6"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-8 w-20 bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-zinc-800 pt-8 space-y-3 mb-12">
              <div className="h-3 w-full bg-gray-100 dark:bg-zinc-900 animate-pulse"></div>
              <div className="h-3 w-full bg-gray-100 dark:bg-zinc-900 animate-pulse"></div>
              <div className="h-3 w-2/3 bg-gray-100 dark:bg-zinc-900 animate-pulse"></div>
            </div>
            
            <div className="h-14 w-full bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-red-600 gap-4">
        <AlertCircle className="w-10 h-10" />
        <p className="uppercase text-xs tracking-widest">Product not found</p>
        <p className="text-xs">{error?.message}</p>
        <Link to="/" className="btn btn-secondary mt-4">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  const imagesToDisplay = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const currentImage = activeImage || imagesToDisplay[0];

  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-12">
      <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to Collection
      </Link>
      
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        <div className="w-full md:w-1/2 aspect-[3/4] flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {imagesToDisplay.length > 1 && (
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-20 flex-shrink-0 hide-scrollbar">
              {imagesToDisplay.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 flex-shrink-0 bg-gray-50 dark:bg-zinc-900 transition-all cursor-pointer ${
                    currentImage === img 
                      ? 'ring-1 ring-black dark:ring-white opacity-100' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.title} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          
          {/* Main Image */}
          <div className="flex-grow bg-gray-50 dark:bg-zinc-900 flex items-center justify-center h-full">
            <img 
              src={currentImage} 
              alt={product.title} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-4">
            <span className="text-[10px] text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-light uppercase tracking-widest mb-6 text-black dark:text-white">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-medium text-black dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            <span className="bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase tracking-widest px-3 py-1">
              ★ {product.rating.toFixed(1)}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mb-12 border-t border-gray-200 dark:border-zinc-800 pt-8">
            {product.description || "No description available."}
          </p>
          
          <button
            onClick={() => addToCart(product)}
            className="btn btn-primary w-full py-4 text-sm gap-3"
          >
            <ShoppingBag size={18} />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
