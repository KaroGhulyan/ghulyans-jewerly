import { prisma } from "@/lib/prisma"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
            <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Exquisite Ghulyan's Jewelry
                        </h1>
                        <p className="text-xl text-gray-600">
                            Handcrafted with love and tradition. Discover our collection of unique pieces.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button size="lg" asChild>
                                <Link href="/products">
                                    Shop All Jewelry
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/featured">
                                    View Featured
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

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

            {/* Why Choose Us Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">💎</span>
                            </div>
                            <h3 className="text-xl font-semibold">Quality Craftsmanship</h3>
                            <p className="text-gray-600">
                                Each piece is carefully handcrafted by skilled Armenian artisans
                            </p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">🇦🇲</span>
                            </div>
                            <h3 className="text-xl font-semibold">Armenian Heritage</h3>
                            <p className="text-gray-600">
                                Traditional designs passed down through generations
                            </p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">✨</span>
                            </div>
                            <h3 className="text-xl font-semibold">Unique Pieces</h3>
                            <p className="text-gray-600">
                                One-of-a-kind jewelry you won't find anywhere else
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}