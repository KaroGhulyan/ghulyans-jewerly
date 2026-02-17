"use client"

import { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useLanguage } from "@/components/providers/language-context"

interface ProductTableProps {
    products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
    const router = useRouter()
    const { t } = useLanguage()

    async function onDelete(id: string) {
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
                                {/*Name*/} {t.admin.products} {/* Using generic "Products" or maybe add "Name" key later if needed, but for now products is ok or manual text */}
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
                                            {product.inStock ? t.common.inStock : t.common.outOfStock}
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

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>{t.admin.deleteConfirmTitle}</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {t.admin.deleteConfirmDesc}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>{t.admin.cancel}</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => onDelete(product.id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            {t.admin.delete}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
