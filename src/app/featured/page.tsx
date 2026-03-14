import { prisma } from "@/lib/prisma"
import { ProductsClient } from "../products/products-client"

export const dynamic = "force-dynamic"

export default async function FeaturedPage() {
    const products = await prisma.product.findMany({
        where: {
            featured: true,
            inStock: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className="pt-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-gold bg-clip-text text-transparent inline-block">
                        Featured Collection
                    </h1>
                    <p className="text-gray-600">
                        Our most exclusive and handpicked pieces, selected for their unique craftsmanship and timeless beauty.
                    </p>
                </div>
                <ProductsClient initialProducts={products} />
            </div>
        </div>
    )
}
