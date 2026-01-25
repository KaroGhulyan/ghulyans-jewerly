import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AdminHeader() {
    return (
        <div className="flex items-center justify-between border-b px-4 py-4 md:px-6">
            <div className="flex items-center gap-4">
                <Link href="/" className="font-bold text-lg hover:underline">
                    &larr; Back to Site
                </Link>
                <h1 className="text-xl font-bold border-l pl-4 ml-4">Admin Dashboard</h1>
            </div>
            <Button asChild>
                <Link href="/admin/products/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Link>
            </Button>
        </div>
    )
}
