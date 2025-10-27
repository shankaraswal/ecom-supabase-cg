import { z } from 'zod';

export const isServer = typeof window === 'undefined';

export const itemSchema = z.object({
    name: z.string({ message: 'Item name should be a string' }).min(4),
    image: z.instanceof(isServer ? File : FileList, { message: 'Item image should be a image' }),
    description: z.string({ message: 'Item description should be a string' }).min(8),
    price: z.number({ message: 'Item price should be a number' }),
});