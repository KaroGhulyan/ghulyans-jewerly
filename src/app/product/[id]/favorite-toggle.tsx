"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useLoginModal } from "@/hooks/use-login-modal"

interface FavoriteToggleProps {
    productId: number | string
}

export function FavoriteToggle({ productId }: FavoriteToggleProps) {
    const { data: session } = useSession()
    const router = useRouter()
    const { onOpen } = useLoginModal()
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session) {
            fetch("/api/favorites")
                .then(res => res.json())
                .then(favorites => {
                    setIsFavorite(favorites.some((f: any) => f.productId === productId))
                })
        }
    }, [session, productId])

    const toggleFavorite = async () => {
        if (!session) {
            onOpen()
            return
        }

        setIsLoading(true)
        try {
            if (isFavorite) {
                await fetch(`/api/favorites?productId=${productId}`, { method: "DELETE" })
                setIsFavorite(false)
            } else {
                await fetch("/api/favorites", {
                    method: "POST",
                    body: JSON.stringify({ productId }),
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
        <Button
            variant="outline"
            size="lg"
            className={`px-6 border-primary-200 ${isFavorite ? 'text-red-500 bg-red-50 border-red-200' : 'text-gray-600'}`}
            onClick={toggleFavorite}
            disabled={isLoading}
        >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
    )
}
