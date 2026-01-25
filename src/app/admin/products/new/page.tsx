import { ProductForm } from "@/components/admin/product-form"
import Link from "next/link"

export default function NewProductPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/admin" className="text-sm text-muted-foreground hover:underline mb-2 block">
                    &larr; Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                <p className="text-muted-foreground">
                    Create a new product to add to your catalog.
                </p>
            </div>
            <div className="border rounded-lg p-6 bg-white shadow-sm">
                <ProductForm />
            </div>
        </div>
    )
}
