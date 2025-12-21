import {notFound} from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {prisma} from "@/lib/prisma"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {formatPrice} from "@/lib/utils"
import {ArrowLeft, ShoppingCart} from "lucide-react"
import {ProductGrid} from "@/components/product/product-grid"

export default async function ProductDetailPage({
                                                    params,
                                                }: {
    params: { id: string }
}) {
    const product = await prisma.product.findUnique({
        where: {id: params.id},
    })

    if (!product) {
        notFound()
    }

    // Fetch related products (same category)
    const relatedProducts = await prisma.product.findMany({
        where: {
            category: product.category,
            id: {not: product.id},
            inStock: true,
        },
        take: 4,
    })

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-primary-600">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-primary-600">
                            Products
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Detail */}
            <div className="container mx-auto px-4 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
                >
                    <ArrowLeft className="w-4 h-4"/>
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <Image
                                src={product.images[0] || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.featured && (
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-primary-600 text-white border-0">
                                        Featured
                                    </Badge>
                                </div>
                            )}
                            {!product.inStock && (
                                <div className="absolute top-4 left-4">
                                    <Badge variant="secondary" className="bg-gray-800 text-white border-0">
                                        Sold Out
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery (if multiple images) */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-transparent hover:border-primary-600 cursor-pointer"
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category */}
                        <div>
                            <Badge variant="outline">
                                {product.category.replace('_', ' ')}
                            </Badge>
                        </div>

                        {/* Product Name */}
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                            {product.nameHy && (
                                <p className="text-2xl text-gray-600">{product.nameHy}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <p className="text-4xl font-bold text-primary-700">
                                {formatPrice(product.price)}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 border-t border-b py-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Description</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                            {product.descriptionHy && (
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Նկարագրություն</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.descriptionHy}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Product Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">Material</p>
                                    <p className="font-medium">{product.material}</p>
                                </div>
                                {product.weight && (
                                    <div>
                                        <p className="text-gray-600">Weight</p>
                                        <p className="font-medium">{product.weight}g</p>
                                    </div>
                                )}
                                {product.size && (
                                    <div>
                                        <p className="text-gray-600">Size</p>
                                        <p className="font-medium">{product.size}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-gray-600">Availability</p>
                                    <p className="font-medium">
                                        {product.inStock ? (
                                            <span className="text-green-600">In Stock</span>
                                        ) : (
                                            <span className="text-red-600">Out of Stock</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="space-y-4 pt-6">
                            <Button
                                size="lg"
                                className="w-full"
                                disabled={!product.inStock}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2"/>
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                            <p className="text-sm text-gray-500 text-center">
                                Free shipping on orders over 500,000 AMD
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
                        <ProductGrid products={relatedProducts}/>
                    </div>
                )}
            </div>
        </div>
    )
}