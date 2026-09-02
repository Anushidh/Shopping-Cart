import { useQuery } from '@tanstack/react-query';
import { ProductSchema } from '../types/product';
import type { Product } from '../types/product';

export const useProduct = (id: string | undefined) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return ProductSchema.parse(data);
    },
    enabled: !!id,
  });
};
