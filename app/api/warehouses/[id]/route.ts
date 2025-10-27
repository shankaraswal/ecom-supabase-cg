import { db } from '@/lib/db/db';
import { warehouses } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const warehouse = await db
            .select()
            .from(warehouses)
            .where(eq(warehouses.id, Number(id)))
            .limit(1);

        if (!warehouse.length) {
            return Response.json({ message: 'warehouse not found.' }, { status: 400 });
        }

        return Response.json(warehouse[0]);
    } catch (err) {
        return Response.json({ message: 'Failed to fetch a warehouse', error: err }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        // Check if the warehouse exists
        const warehouse = await db
            .select()
            .from(warehouses)
            .where(eq(warehouses.id, Number(id)))
            .limit(1);

        if (!warehouse.length) {
            return Response.json({ message: 'Warehouse not found.' }, { status: 404 });
        }

        // Perform the deletion
        await db.delete(warehouses).where(eq(warehouses.id, Number(id)));

        return Response.json({ message: 'Warehouse deleted successfully.' }, { status: 200 });
    } catch (err) {
        console.error('Error deleting warehouse:', err); // Log the error for debugging
        return Response.json({ message: 'Failed to delete warehouse', error: err }, { status: 500 });
    }
}