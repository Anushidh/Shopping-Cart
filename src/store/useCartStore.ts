import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      addToCart: (product) => 
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          
          if (existingItem) {
            const newQuantity = Math.min(existingItem.quantity + 1, 5);
            return {
              items: state.items.map((item) => 
                item.id === product.id ? { ...item, quantity: newQuantity } : item
              ),
            };
          }
          
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
        
      removeFromCart: (productId) => 
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
        
      updateQuantity: (productId, quantity) => 
        set((state) => {
          const clampedQuantity = Math.max(1, Math.min(5, quantity));
          
          return {
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity: clampedQuantity } : item
            ),
          };
        }),
        
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
);
