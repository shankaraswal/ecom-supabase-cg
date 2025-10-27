import { db } from '@/lib/db/db';
import { products } from '@/lib/db/schema';
import { productSchema } from '@/lib/validators/productSchema';
import { desc } from 'drizzle-orm';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';


// POST PRODUCT
export async function POST(request: Request) {
    // todo: check user acess first to add product-- only admin can add a product

    const data = await request.formData();

    let validatedData;

    try {
        validatedData = productSchema.parse({
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

        await db.insert(products).values({ ...validatedData, image: filename })
        return Response.json({ message: "OK" }, { status: 201 })
    }
    catch (err) {
        // remove stored image todo

        return Response.json({ message: "Failed to store in db", error: err }, { status: 500 })

    }
}

// GET PRODUCTS
export async function GET() {

    //  no authentication--public route
    let allProducts;
    try {

        allProducts = await db.select().from(products).orderBy(desc(products.id));
    }
    catch (err) {
        return Response.json({ message: "Failed to fetch products list", error: err }, { status: 500 })
    }

    return Response.json(allProducts)
}