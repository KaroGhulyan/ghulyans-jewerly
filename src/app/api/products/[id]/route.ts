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
    images: z.array(z.string()).optional(),
    inStock: z.boolean(),
    featured: z.boolean(),
})

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
        }

        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
        })

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
        }

        const body = await req.json()
        console.log("PATCH Body:", body);

        // Handle the single image URL from the form -> array for DB
        if (typeof body.images === 'string') {
            body.images = body.images ? [body.images] : []
        } else if (body.images === null || body.images === undefined) {
             // Keep existing images if not provided in partial update
        }

        const validatedData = productSchema.partial().parse(body)

        const product = await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                ...validatedData,
                images: validatedData.images ? (validatedData.images as string[]).map(getGoogleDriveDirectLink) : undefined,
                category: validatedData.category as any,
            },
        })

        revalidatePath('/')
        revalidatePath('/products')
        revalidatePath('/admin')
        revalidatePath(`/product/${params.id}`)

        return NextResponse.json(product)
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Zod Validation Error:", error.issues);
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        console.error("PRODUCT_PATCH_ERROR", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
        }

        const product = await prisma.product.delete({
            where: {
                id: id,
            },
        })

        revalidatePath('/')
        revalidatePath('/products')

        return NextResponse.json(product)
    } catch (error) {
        console.error("PRODUCT_DELETE_ERROR", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
