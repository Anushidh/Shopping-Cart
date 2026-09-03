import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  category: z.string(),
  price: z.number(),
  rating: z.number(),
  thumbnail: z.string(),
  images: z.array(z.string()).optional(),
});

export const ProductResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number()
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
