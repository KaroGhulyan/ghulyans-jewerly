import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { ProductGrid } from "@/components/product/product-grid"
import { User, LogOut, Settings, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteAccountButton } from "@/components/profile/delete-account-button"
import { SignOutButton } from "@/components/auth/sign-out-button"

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        redirect("/api/auth/signin")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            favorites: {
                include: {
                    product: true
                }
            }
        }
    })

    if (!user) {
        redirect("/")
    }

    const favoriteProducts = user.favorites.map(f => f.product)
    const isAdmin = user.role === "ADMIN"

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
                    <div className="bg-gradient-gold h-32 md:h-48" />
                    <div className="px-6 pb-8 md:px-12 md:pb-12 -mt-16 md:-mt-20">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white bg-gray-100 overflow-hidden flex items-center justify-center shadow-md shrink-0">
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt=""
                                            referrerPolicy="no-referrer"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-16 w-16 md:h-20 md:w-20 text-gray-400" />
                                    )}
                                </div>
                                <div className="text-center md:text-left mb-2">
                                    <h1 className="text-3xl font-bold">{user.name || "User"}</h1>
                                    <p className="text-gray-500">{user.email}</p>
                                    {isAdmin && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mt-2">
                                            Admin
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {isAdmin && (
                                    <a href="/admin">
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" />
                                            Admin Panel
                                        </Button>
                                    </a>
                                )}
                                <SignOutButton />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                            Your Favorites
                        </h2>
                        <span className="text-gray-500">
                            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'Product' : 'Products'}
                        </span>
                    </div>

                    <ProductGrid
                        products={favoriteProducts as any}
                        emptyMessage="You haven't added any favorites yet. Start exploring our collection!"
                    />
                </div>

                {/* Danger Zone */}
                <div className="mt-16 pt-8 border-t flex flex-col items-center">
                    <p className="text-sm text-gray-500 mb-4 text-center">
                        Need to leave us? We'll be sorry to see you go.
                    </p>
                    <DeleteAccountButton />
                </div>
            </div>
        </div>
    )
}
