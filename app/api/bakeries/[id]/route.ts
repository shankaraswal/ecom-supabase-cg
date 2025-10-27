import { db } from '@/lib/db/db';
import { bakeries } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const bakery = await db
            .select()
            .from(bakeries)
            .where(eq(bakeries.id, Number(id)))
            .limit(1);

        if (!bakery.length) {
            return Response.json({ message: 'Bakery not found.' }, { status: 400 });
        }

        return Response.json(bakery[0]);
    } catch (err) {
        return Response.json({ message: 'Failed to fetch a bakery', error: err }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        // Check if the bakery exists
        const bakery = await db
            .select()
            .from(bakeries)
            .where(eq(bakeries.id, Number(id)))
            .limit(1);

        if (!bakery.length) {
            return Response.json({ message: 'Bakery not found.' }, { status: 404 });
        }

        // Perform the deletion
        await db.delete(bakeries).where(eq(bakeries.id, Number(id)));

        return Response.json({ message: 'Bakery deleted successfully.' }, { status: 200 });
    } catch (err) {
        console.error('Error deleting bakery:', err); // Log the error for debugging
        return Response.json({ message: 'Failed to delete bakery', error: err }, { status: 500 });
    }
}