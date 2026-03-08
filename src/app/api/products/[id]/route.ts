import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as z from "zod"
import { revalidatePath } from "next/cache"

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
        const product = await prisma.product.findUnique({
            where: {
                id: params.id,
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
        const body = await req.json()

        // Handle the single image URL from the form -> array for DB
        if (typeof body.images === 'string') {
            body.images = body.images ? [body.images] : []
        }

        const validatedData = productSchema.partial().parse(body)

        const product = await prisma.product.update({
            where: {
                id: params.id,
            },
            data: {
                ...validatedData,
                category: validatedData.category as any,
            },
        })

        revalidatePath('/')
        revalidatePath('/products')
        revalidatePath(`/product/${params.id}`)

        return NextResponse.json(product)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues }, { status: 400 })
        }
        console.error("PRODUCT_PATCH_ERROR", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const product = await prisma.product.delete({
            where: {
                id: params.id,
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
