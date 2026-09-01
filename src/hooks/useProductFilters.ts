import { useState, useMemo } from 'react';
import type { Product } from '../types/product';

export const useProductFilters = (products: Product[] | undefined) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      const matchesPrice = maxPrice ? product.price <= maxPrice : true;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, maxPrice]);

  const uniqueCategories = useMemo(() => {
    if (!products) return [];
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories);
  }, [products]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMaxPrice('');
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    filteredProducts,
    uniqueCategories,
    clearFilters,
  };
};
