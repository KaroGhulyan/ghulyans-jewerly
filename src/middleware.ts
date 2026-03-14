import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const isAdmin = token?.role === "ADMIN"
        const { pathname } = req.nextUrl
        const { method } = req
        
        const isAdminPath = pathname.startsWith("/admin")
        const isProductApi = pathname.startsWith("/api/products")

        // Allow public viewing of products (GET)
        if (isProductApi && method === "GET") {
            return NextResponse.next()
        }

        // Only block if it's admin path or a non-GET product API call
        if ((isAdminPath || isProductApi) && !isAdmin) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: ["/admin/:path*", "/api/products/:path*"],
}
