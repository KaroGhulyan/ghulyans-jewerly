import { prisma } from "@/lib/prisma"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Hero } from "@/components/home/hero"
import { GoldPriceTicker } from "@/components/home/gold-price-ticker"

export const dynamic = "force-dynamic"

export default async function Home() {
    // Fetch featured products
    const featuredProducts = await prisma.product.findMany({
        where: {
            featured: true,
            inStock: true,
        },
        take: 4,
        orderBy: {
            createdAt: 'desc',
        },
    })

    // Fetch all products for "All Jewelry" section
    const allProducts = await prisma.product.findMany({
        where: {
            inStock: true,
        },
        take: 8,
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Hero />

            {/* Featured Products Section */}
            {featuredProducts.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold">Featured Collection</h2>
                                <p className="text-gray-600 mt-2">Our handpicked selection of finest pieces</p>
                            </div>
                            <Button variant="outline" asChild className="hidden md:flex">
                                <Link href="/featured">
                                    View All Featured
                                </Link>
                            </Button>
                        </div>
                        <ProductGrid products={featuredProducts} />
                    </div>
                </section>
            )}

            {/* All Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold">All Jewelry</h2>
                            <p className="text-gray-600 mt-2">Explore our complete collection</p>
                        </div>
                        <Button variant="outline" asChild className="hidden md:flex">
                            <Link href="/products">
                                View All Products
                            </Link>
                        </Button>
                    </div>
                    <ProductGrid products={allProducts} />
                    <div className="mt-12 text-center md:hidden">
                        <Button variant="outline" asChild>
                            <Link href="/products">
                                View All Products
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Gold Prices Section */}
            <GoldPriceTicker />
        </div>
    )
}