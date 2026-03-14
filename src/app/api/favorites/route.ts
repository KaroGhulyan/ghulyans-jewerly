import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
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

        return NextResponse.json(user?.favorites || [])
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { productId: rawProductId } = await req.json()
        const productId = parseInt(rawProductId)

        if (isNaN(productId)) {
            return NextResponse.json({ error: "Valid Product ID required" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const favorite = await prisma.favorite.upsert({
            where: {
                userId_productId: {
                    userId: user.id,
                    productId
                }
            },
            update: {},
            create: {
                userId: user.id,
                productId
            }
        })

        return NextResponse.json(favorite)
    } catch (error) {
        console.error("FAVORITE_POST_ERROR", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { searchParams } = new URL(req.url)
        const productId = parseInt(searchParams.get("productId") || "")

        if (isNaN(productId)) {
            return NextResponse.json({ error: "Valid Product ID required" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        await prisma.favorite.delete({
            where: {
                userId_productId: {
                    userId: user.id,
                    productId
                }
            }
        })

        return NextResponse.json({ message: "Removed from favorites" })
    } catch (error) {
        console.error("FAVORITE_DELETE_ERROR", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
