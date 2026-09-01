import { useQuery } from '@tanstack/react-query';
import { ProductResponseSchema } from '../types/product';
import type { ProductResponse } from '../types/product';

const fetchProducts = async (): Promise<ProductResponse> => {
  const response = await fetch('https://dummyjson.com/products?limit=100');
  
  if (!response.ok) {
    throw new Error('Failed to fetch products from the server');
  }
  
  const data = await response.json();
  
  return ProductResponseSchema.parse(data);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
};
