import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        // All associated data (favorites, accounts, sessions) will be deleted
        // automatically due to `onDelete: Cascade` in the schema.
        await prisma.user.delete({
            where: { id: user.id },
        })

        return new NextResponse("Account deleted", { status: 200 })
    } catch (error) {
        console.error("[USER_DELETE_ERROR]", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
