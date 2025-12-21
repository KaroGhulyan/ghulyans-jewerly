"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/types"
import { ShoppingCart, Eye } from "lucide-react"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const mainImage = product.images[0] || "/placeholder-jewelry.jpg"

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.featured && (
                        <Badge variant="default" className="bg-primary-600 text-white border-0">
                            Featured
                        </Badge>
                    )}
                    {!product.inStock && (
                        <Badge variant="secondary" className="bg-gray-800 text-white border-0">
                            Sold Out
                        </Badge>
                    )}
                </div>

                {/* Quick View Button - Shows on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-white text-primary-700 hover:bg-primary-50"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Quick View
                    </Button>
                </div>
            </Link>

            <CardContent className="p-4">
                {/* Category */}
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                    {product.category.replace('_', ' ')}
                </p>

                {/* Product Name */}
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-primary-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                {/* Armenian Name */}
                {product.nameHy && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        {product.nameHy}
                    </p>
                )}

                {/* Material */}
                <p className="text-sm text-gray-500 mb-3">
                    {product.material}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary-700">
            {formatPrice(product.price)}
          </span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full"
                    disabled={!product.inStock}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </CardFooter>
        </Card>
    )
}