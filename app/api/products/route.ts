import { productSchema } from "@/lib/db/validators/productSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";


export async function POST(request: Request) {
    const data = await request.formData();

    let validatedData;

    try {
        validatedData = productSchema.parse({
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            image: data.get("image")
        })

    }
    catch (err) {
        return Response.json({ message: err }, { status: 400 })

    }
    const filename = `${Date.now()}.${validatedData.image.name.split(".").slice(-1)}`

    try {

        const buffer = Buffer.from(await validatedData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(), "public/assets", filename), buffer)
    }
    catch (err) {

        return Response.json({ message: "Failed to save the file ot fs", error: err }, { status: 500 })
    }
}
