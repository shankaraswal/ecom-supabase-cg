import { z } from "zod";


// Schema for creating a product (used for POST requests)
export const createProductSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
    image: z.instanceof(File, { message: "Please upload product image" }),
    description: z.string({ message: "Please enter product description" }),
    price: z.number().positive('Price must be a number'),
});

// Schema for reading/updating a product (includes id, createdAt, updatedAt)
export const productSchema = createProductSchema.extend({
    id: z.number().int().positive('ID must be a positive integer'), // serial primaryKey
    createdAt: z.date().default(() => new Date()), // Default to current timestamp
    updatedAt: z.date().default(() => new Date()), // Default to current timestamp
});

// TypeScript types for type safety
export type CreateProduct = z.infer<typeof createProductSchema>;
export type Product = z.infer<typeof productSchema>;