import { db } from "@/lib/db/db";
import { bakeries } from "@/lib/db/schema";
import { bakerySchema } from "@/lib/validators/bakerySchema";
import { asc } from 'drizzle-orm';

export async function POST(request: Request) {
    const requestData = await request.json();
    let validatedData;
    try {
        validatedData = bakerySchema.parse(requestData)
    }

    catch (err) {
        return Response.json({ message: err }, { status: 400 })
    }

    try {
        await db.insert(bakeries).values(validatedData)
        return Response.json({ message: "OK" }, { status: 201 })

    } catch (err) {
        return Response.json({ message: 'Failed to add bakery', error: err }, { status: 500 });
    }
}



export async function GET() {

    //  no authentication--public route
    let allBakeries;
    try {

        allBakeries = await db.select().from(bakeries).orderBy(asc(bakeries.id));
    }
    catch (err) {
        return Response.json({ message: "Failed to fetch bakeries list", error: err }, { status: 500 })
    }

    return Response.json(allBakeries)
}