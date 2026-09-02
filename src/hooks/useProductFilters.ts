import { useState, useMemo } from 'react';
import type { Product } from '../types/product';

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | '';

export const useProductFilters = (products: Product[] | undefined) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortOption, setSortOption] = useState<SortOption>('');

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? product.category === category : true;
      const matchesPrice = maxPrice ? product.price <= maxPrice : true;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortOption === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, search, category, maxPrice, sortOption]);

  const uniqueCategories = useMemo(() => {
    if (!products) return [];
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories);
  }, [products]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMaxPrice('');
    setSortOption('');
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    sortOption,
    setSortOption,
    filteredProducts,
    uniqueCategories,
    clearFilters,
  };
};
