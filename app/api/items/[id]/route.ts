import { db } from '@/lib/db/db';
import { items } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

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