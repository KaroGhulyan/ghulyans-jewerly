"use client"

import { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface ProductTableProps {
    products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
    const router = useRouter()

    async function onDelete(id: string) {
        if (!confirm("Are you sure you want to delete this product?")) return

        try {
            await fetch(`/api/products/${id}`, {
                method: "DELETE",
            })
            router.refresh()
        } catch (error) {
            console.error("Failed to delete", error)
            alert("Failed to delete product")
        }
    }

    return (
        <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">
                                Image
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Name
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Category
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Price
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Status
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Featured
                            </th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-4 text-center text-muted-foreground">
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                    <td className="p-4 align-middle">
                                        {product.images?.[0] ? (
                                            <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted">
                                                <span className="text-xs text-muted-foreground">No img</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 align-middle font-medium">{product.name}</td>
                                    <td className="p-4 align-middle">{product.category}</td>
                                    <td className="p-4 align-middle">${product.price.toFixed(2)}</td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={product.inStock ? "default" : "secondary"}>
                                            {product.inStock ? "In Stock" : "Out of Stock"}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle">
                                        {product.featured && <Badge variant="outline">Featured</Badge>}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => onDelete(product.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
