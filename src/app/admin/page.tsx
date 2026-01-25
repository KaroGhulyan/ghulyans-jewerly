import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProductTable } from "@/components/admin/product-table"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <div className="flex flex-col min-h-screen">
            <AdminHeader />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">{products.length} products total</p>
                </div>
                <ProductTable products={products} />
            </main>
        </div>
    )
}
