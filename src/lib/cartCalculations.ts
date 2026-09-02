import type { CartItem } from '../store/useCartStore';

export const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const tax = subtotal * 0.05;
  
  const discount = subtotal > 100 ? subtotal * 0.10 : 0;
  
  const total = subtotal + tax - discount;
  
  return {
    subtotal,
    tax,
    discount,
    total
  };
};
