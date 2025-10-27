import { z } from 'zod';

export const isServer = typeof window === 'undefined';

export const warehouseSchema = z.object({
    name: z.string({ message: 'Warehouse name should be a string' }).min(4),
    pincode: z.string({ message: 'Pincode must be a string' })
        .length(6, { message: 'Pincode must be exactly 6 characters' }),
});