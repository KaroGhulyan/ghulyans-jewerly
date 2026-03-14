"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Product } from "@/types"
import { Heart, Eye } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLoginModal } from "@/hooks/use-login-modal"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { data: session } = useSession()
    const router = useRouter()
    const { onOpen } = useLoginModal()
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const mainImage = product.images[0] || "/placeholder-jewelry.jpg"

    useEffect(() => {
        if (session) {
            fetch("/api/favorites")
                .then(res => res.json())
                .then(favorites => {
                    setIsFavorite(favorites.some((f: any) => f.productId === product.id))
                })
        }
    }, [session, product.id])

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!session) {
            onOpen()
            return
        }

        setIsLoading(true)
        try {
            if (isFavorite) {
                await fetch(`/api/favorites?productId=${product.id}`, { method: "DELETE" })
                setIsFavorite(false)
            } else {
                await fetch("/api/favorites", {
                    method: "POST",
                    body: JSON.stringify({ productId: product.id }),
                    headers: { "Content-Type": "application/json" }
                })
                setIsFavorite(true)
            }
            router.refresh()
        } catch (error) {
            console.error("FAVORITE_TOGGLE_ERROR", error)
        } finally {
            setIsLoading(false)
        }
    }

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
                    unoptimized={product.images[0]?.includes('drive.google.com')}
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

            {/* Favorite Button - Outside Link to prevent HTML nesting issues */}
            <div className="absolute top-3 right-3 z-10">
                <Button
                    variant="secondary"
                    size="icon"
                    className={`rounded-full shadow-md bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                    onClick={toggleFavorite}
                    disabled={isLoading}
                >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
            </div>

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
                <Link href={`/product/${product.id}`} className="w-full">
                    <Button
                        variant="outline"
                        className="w-full border-primary-200 text-primary-700 hover:bg-primary-50"
                    >
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}