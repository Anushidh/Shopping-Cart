import { describe, it, expect } from 'vitest';
import { calculateTotals } from './cartCalculations';

describe('cartCalculations', () => {
  describe('calculateTotals', () => {
    it('should calculate totals correctly with no discount (under $100)', () => {
      // Setup mock cart items totaling $40
      const items = [
        { price: 10, quantity: 2 }, // $20
        { price: 20, quantity: 1 }, // $20
      ] as any[]; 

      const result = calculateTotals(items);

      expect(result.subtotal).toBe(40);
      expect(result.tax).toBe(2); // 5% of 40 = 2
      expect(result.discount).toBe(0); // Subtotal < 100, so no discount
      expect(result.total).toBe(42); // 40 + 2 - 0 = 42
    });

    it('should apply 10% discount when subtotal is strictly over $100', () => {
      // Setup mock cart items totaling $120
      const items = [
        { price: 50, quantity: 2 }, // $100
        { price: 20, quantity: 1 }, // $20
      ] as any[]; 

      const result = calculateTotals(items);

      expect(result.subtotal).toBe(120);
      expect(result.tax).toBe(6); // 5% of 120 = 6
      expect(result.discount).toBe(12); // 10% of 120 = 12
      expect(result.total).toBe(114); // 120 + 6 - 12 = 114
    });

    it('should handle an empty cart correctly', () => {
      const items: any[] = [];

      const result = calculateTotals(items);

      expect(result.subtotal).toBe(0);
      expect(result.tax).toBe(0);
      expect(result.discount).toBe(0);
      expect(result.total).toBe(0);
    });
  });
});
