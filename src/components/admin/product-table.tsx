"use client"

import { useState, useMemo } from "react"
import { Product, ProductCategory } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
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

const ITEMS_PER_PAGE = 10

export function ProductTable({ products }: ProductTableProps) {
    const router = useRouter()
    const { t } = useLanguage()
    
    // State for filtering and pagination
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<string>("ALL")
    const [statusFilter, setStatusFilter] = useState<string>("ALL")
    const [minPrice, setMinPrice] = useState<string>("")
    const [maxPrice, setMaxPrice] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)

    async function onDelete(id: number) {
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

    // Filtering logic
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.id.toString().includes(searchQuery)
            
            const matchesCategory = categoryFilter === "ALL" || product.category === categoryFilter
            
            const matchesStatus = statusFilter === "ALL" || 
                (statusFilter === "IN_STOCK" ? product.inStock : !product.inStock)

            const matchesMinPrice = minPrice === "" || product.price >= parseFloat(minPrice)
            const matchesMaxPrice = maxPrice === "" || product.price <= parseFloat(maxPrice)

            return matchesSearch && matchesCategory && matchesStatus && matchesMinPrice && matchesMaxPrice
        })
    }, [products, searchQuery, categoryFilter, statusFilter, minPrice, maxPrice])

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
    }, [filteredProducts, currentPage])

    // Reset page when filters change
    useMemo(() => {
        setCurrentPage(1)
    }, [searchQuery, categoryFilter, statusFilter, minPrice, maxPrice])

    return (
        <div className="space-y-4">
            {/* Filters and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Category:</span>
                        <select 
                            value={categoryFilter} 
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="flex h-9 w-[160px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="ALL">All Categories</option>
                            {Object.values(ProductCategory).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Status:</span>
                        <select 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="flex h-9 w-[160px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="ALL">All Status</option>
                            <option value="IN_STOCK">In Stock</option>
                            <option value="OUT_OF_STOCK">Out of Stock</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Price Range:</span>
                        <div className="flex items-center gap-1">
                            <Input
                                placeholder="Min"
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-20 h-9 px-2"
                            />
                            <span className="text-muted-foreground">-</span>
                            <Input
                                placeholder="Max"
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-20 h-9 px-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="bg-gray-50/50 border-b">
                            <tr>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[80px]">
                                    Image
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Product ID
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
                            {paginatedProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="h-24 text-center text-muted-foreground">
                                        No products found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                paginatedProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b transition-colors hover:bg-muted/30"
                                    >
                                        <td className="p-4 align-middle">
                                            {product.images?.[0] ? (
                                                <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized={product.images[0]?.includes('drive.google.com')}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted">
                                                    <span className="text-[10px] text-muted-foreground">No img</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 align-middle font-mono text-xs text-muted-foreground">
                                            {product.id}
                                        </td>
                                        <td className="p-4 align-middle font-medium">{product.name}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant="outline" className="font-normal capitalize">
                                                {product.category.toLowerCase()}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle font-medium font-mono">
                                            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={product.inStock ? "default" : "secondary"}>
                                                {product.inStock ? t.common.inStock : t.common.outOfStock}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle">
                                            {product.featured && (
                                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
                                                    Featured
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                                                    <Link href={`/admin/products/${product.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                        <span className="font-medium">
                            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                        </span>{" "}
                        of <span className="font-medium">{filteredProducts.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>
                        <div className="flex items-center gap-1 flex-wrap justify-center">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "ghost"}
                                    size="sm"
                                    className="w-8 h-8 p-0"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
