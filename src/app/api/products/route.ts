import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as z from "zod"

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
        // Handle the single image URL from the form -> array for DB
        if (typeof body.images === 'string') {
            body.images = body.images ? [body.images] : []
        }

        const validatedData = productSchema.parse(body)

        const product = await prisma.product.create({
            data: {
                ...validatedData,
                // Ensure enum is matching
                category: validatedData.category as any,
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        console.error("PRODUCT_POST_ERROR", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
