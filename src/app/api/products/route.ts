import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as z from "zod"
import { revalidatePath } from "next/cache"
import { getGoogleDriveDirectLink } from "@/lib/utils"

const productSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    price: z.coerce.number().min(0),
    category: z.string().min(1),
    material: z.string().min(1),
    images: z.array(z.string()).optional(), // Expecting array of strings for images
    inStock: z.boolean(),
    featured: z.boolean(),
})

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            },
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log("raw_post_body", JSON.stringify(body, null, 2));

        // Handle the single image URL from the form -> array for DB
        if (typeof body.images === 'string') {
            body.images = body.images ? [body.images] : []
        } else if (!body.images) {
            body.images = []
        }

        const validatedData = productSchema.parse(body)
        console.log("validated_post_data", JSON.stringify(validatedData, null, 2));

        const product = await prisma.product.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                price: parseFloat(validatedData.price.toString()),
                category: validatedData.category as any,
                material: validatedData.material,
                images: (validatedData.images || []).map(getGoogleDriveDirectLink),
                inStock: !!validatedData.inStock,
                featured: !!validatedData.featured,
            },
        })

        console.log("creation_success", product.id);

        revalidatePath('/')
        revalidatePath('/products')
        revalidatePath('/admin')
        revalidatePath('/featured')

        return NextResponse.json(product)
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Zod Validation Error:", error.issues);
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        console.error("PRODUCT_POST_ERROR", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        )
    }
}
