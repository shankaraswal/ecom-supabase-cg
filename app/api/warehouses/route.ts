import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";
import { desc } from 'drizzle-orm';

export async function POST(request: Request) {
    const requestData = await request.json();
    let validatedData;
    try {
        validatedData = warehouseSchema.parse(requestData)
    }

    catch (err) {
        return Response.json({ message: err }, { status: 400 })
    }

    try {
        await db.insert(warehouses).values(validatedData)
        return Response.json({ message: "OK" }, { status: 201 })

    } catch (err) {
        return Response.json({ message: 'Failed to add warehouse', error: err }, { status: 500 });
    }
}



export async function GET() {

    //  no authentication--public route
    let allWarehouse;
    try {

        allWarehouse = await db.select().from(warehouses).orderBy(desc(warehouses.id));
    }
    catch (err) {
        return Response.json({ message: "Failed to fetch warehouses list", error: err }, { status: 500 })
    }

    return Response.json(allWarehouse)
}