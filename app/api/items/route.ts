import { db } from '@/lib/db/db';
import { items } from '@/lib/db/schema';
import { itemSchema } from '@/lib/validators/itemSchema';
import { desc } from 'drizzle-orm';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';


// POST ITEM
export async function POST(request: Request) {
    // todo: check user access first to add item-- only admin can add an item

    const data = await request.formData();

    let validatedData;

    try {
        validatedData = itemSchema.parse({
            name: data.get("name"),
            description: data.get("description"),
            price: Number(data.get("price")),
            image: data.get("image")
        })

    }
    catch (err) {
        return Response.json({ message: err }, { status: 400 })

    }
    const filename = `${Date.now()}.${(validatedData.image as File).name.split('.').slice(-1)}`;

    try {
        const buffer = Buffer.from(await (validatedData.image as File).arrayBuffer());
        await writeFile(path.join(process.cwd(), 'public/assets', filename), buffer);
    } catch (err) {
        return Response.json({ message: 'Failed to save the file to fs', error: err }, { status: 500 });
    }

    try {

        await db.insert(items).values({ ...validatedData, image: filename })
        return Response.json({ message: "OK" }, { status: 201 })
    }
    catch (err) {
        // remove stored image todo

        return Response.json({ message: "Failed to store in db", error: err }, { status: 500 })

    }
}

// GET ITEMS
export async function GET() {

    //  no authentication--public route
    let allItems;
    try {

        allItems = await db.select().from(items).orderBy(desc(items.id));
    }
    catch (err) {
        return Response.json({ message: "Failed to fetch items list", error: err }, { status: 500 })
    }

    return Response.json(allItems)
}