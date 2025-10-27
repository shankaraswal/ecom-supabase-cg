import { db } from '@/lib/db/db';
import { items } from '@/lib/db/schema';
import { itemSchema } from '@/lib/validators/itemSchema';
import { eq } from 'drizzle-orm';
import { writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const item = await db
            .select()
            .from(items)
            .where(eq(items.id, Number(id)))
            .limit(1);

        if (!item.length) {
            return Response.json({ message: 'Item not found.' }, { status: 400 });
        }

        return Response.json(item[0]);
    } catch (err) {
        return Response.json({ message: 'Failed to fetch an item', error: err }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        // Check if item exists
        const existingItem = await db
            .select()
            .from(items)
            .where(eq(items.id, Number(id)))
            .limit(1);

        if (!existingItem.length) {
            return Response.json({ message: 'Item not found.' }, { status: 404 });
        }

        const data = await request.formData();
        let validatedData;

        try {
            validatedData = itemSchema.parse({
                name: data.get("name"),
                description: data.get("description"),
                price: Number(data.get("price")),
                image: data.get("image")
            });
        } catch (err) {
            return Response.json({ message: err }, { status: 400 });
        }

        let filename = existingItem[0].image; // Keep existing image by default

        // Handle new image upload
        if (validatedData.image && (validatedData.image as File).size > 0) {
            const newFilename = `${Date.now()}.${(validatedData.image as File).name.split('.').slice(-1)}`;

            try {
                const buffer = Buffer.from(await (validatedData.image as File).arrayBuffer());
                await writeFile(path.join(process.cwd(), 'public/assets', newFilename), buffer);

                // Delete old image if it exists
                if (existingItem[0].image) {
                    try {
                        await unlink(path.join(process.cwd(), 'public/assets', existingItem[0].image));
                    } catch (unlinkErr) {
                        // Ignore error if old file doesn't exist
                        console.warn('Could not delete old image:', unlinkErr);
                    }
                }

                filename = newFilename;
            } catch (err) {
                return Response.json({ message: 'Failed to save the new image', error: err }, { status: 500 });
            }
        }

        // Update item in database
        await db
            .update(items)
            .set({
                name: validatedData.name,
                description: validatedData.description,
                price: validatedData.price,
                image: filename,
                updatedAt: new Date()
            })
            .where(eq(items.id, Number(id)));

        return Response.json({ message: "Item updated successfully" }, { status: 200 });

    } catch (err) {
        return Response.json({ message: 'Failed to update item', error: err }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        // Check if item exists
        const existingItem = await db
            .select()
            .from(items)
            .where(eq(items.id, Number(id)))
            .limit(1);

        if (!existingItem.length) {
            return Response.json({ message: 'Item not found.' }, { status: 404 });
        }

        // Delete image file if it exists
        if (existingItem[0].image) {
            try {
                await unlink(path.join(process.cwd(), 'public/assets', existingItem[0].image));
            } catch (unlinkErr) {
                console.warn('Could not delete image file:', unlinkErr);
            }
        }

        // Delete item from database
        await db.delete(items).where(eq(items.id, Number(id)));

        return Response.json({ message: 'Item deleted successfully.' }, { status: 200 });
    } catch (err) {
        return Response.json({ message: 'Failed to delete item', error: err }, { status: 500 });
    }
}