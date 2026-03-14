import { prisma } from "@/lib/prisma"
import { ProductForm } from "@/components/admin/product-form"
import Link from "next/link"
import { notFound } from "next/navigation"

interface EditProductPageProps {
    params: {
        id: string
    }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const id = parseInt(params.id)
    if (isNaN(id)) {
        notFound()
    }

    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    })

    if (!product) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/admin" className="text-sm text-muted-foreground hover:underline mb-2 block">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                <p className="text-muted-foreground">
                    Update product details.
                </p>
            </div>
            <div className="border rounded-lg p-6 bg-white shadow-sm">
                <ProductForm initialData={product} />
            </div>
        </div>
    )
}
