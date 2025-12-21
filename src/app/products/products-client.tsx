"use client"

import { useState, useEffect } from "react"
import { ProductGrid } from "@/components/product/product-grid"
import { Product, ProductCategory } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const CATEGORIES = [
    { value: "ALL", label: "All Products" },
    { value: "RING", label: "Rings" },
    { value: "NECKLACE", label: "Necklaces" },
    { value: "BRACELET", label: "Bracelets" },
    { value: "EARRINGS", label: "Earrings" },
    { value: "PENDANT", label: "Pendants" },
    { value: "SET", label: "Sets" },
]

const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name: A-Z" },
]

interface ProductsClientProps {
    initialProducts: Product[]
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
    const [sortBy, setSortBy] = useState<string>("newest")
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000])
    const [showFilters, setShowFilters] = useState(false)

    // Filter and sort products
    useEffect(() => {
        let filtered = [...initialProducts]

        // Filter by category
        if (selectedCategory !== "ALL") {
            filtered = filtered.filter(p => p.category === selectedCategory)
        }

        // Filter by price range
        filtered = filtered.filter(
            p => p.price >= priceRange[0] && p.price <= priceRange[1]
        )

        // Sort
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price)
                break
            case "price-high":
                filtered.sort((a, b) => b.price - a.price)
                break
            case "name":
                filtered.sort((a, b) => a.name.localeCompare(b.name))
                break
            case "newest":
            default:
                filtered.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
        }

        setProducts(filtered)
    }, [selectedCategory, sortBy, priceRange, initialProducts])

    const activeFiltersCount =
        (selectedCategory !== "ALL" ? 1 : 0) +
        (priceRange[0] !== 0 || priceRange[1] !== 5000000 ? 1 : 0)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Our Collection</h1>
                    <p className="text-gray-600">
                        Discover our handcrafted Armenian jewelry
                    </p>
                </div>

                {/* Filters Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Mobile Filter Toggle */}
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden"
                        >
                            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                        </Button>

                        {/* Desktop Category Filters */}
                        <div className="hidden md:flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <Button
                                    key={cat.value}
                                    variant={selectedCategory === cat.value ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(cat.value)}
                                >
                                    {cat.label}
                                </Button>
                            ))}
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 md:flex-initial rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Mobile Filters Dropdown */}
                    {showFilters && (
                        <div className="md:hidden mt-4 pt-4 border-t space-y-4">
                            {/* Categories */}
                            <div>
                                <h3 className="font-semibold mb-2">Category</h3>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <Button
                                            key={cat.value}
                                            variant={selectedCategory === cat.value ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedCategory(cat.value)}
                                        >
                                            {cat.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-semibold mb-2">Price Range</h3>
                                <div className="space-y-2">
                                    <Button
                                        variant={priceRange[1] === 500000 ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setPriceRange([0, 500000])}
                                        className="w-full"
                                    >
                                        Under 500,000 AMD
                                    </Button>
                                    <Button
                                        variant={priceRange[0] === 500000 && priceRange[1] === 1000000 ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setPriceRange([500000, 1000000])}
                                        className="w-full"
                                    >
                                        500,000 - 1,000,000 AMD
                                    </Button>
                                    <Button
                                        variant={priceRange[0] === 1000000 && priceRange[1] === 2000000 ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setPriceRange([1000000, 2000000])}
                                        className="w-full"
                                    >
                                        1,000,000 - 2,000,000 AMD
                                    </Button>
                                    <Button
                                        variant={priceRange[0] === 2000000 ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setPriceRange([2000000, 5000000])}
                                        className="w-full"
                                    >
                                        Over 2,000,000 AMD
                                    </Button>
                                    {(priceRange[0] !== 0 || priceRange[1] !== 5000000) && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setPriceRange([0, 5000000])}
                                            className="w-full"
                                        >
                                            Clear Price Filter
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-sm text-gray-600">Active filters:</span>
                        {selectedCategory !== "ALL" && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory("ALL")}
                            >
                                {CATEGORIES.find(c => c.value === selectedCategory)?.label}
                                <span className="ml-1">×</span>
                            </Badge>
                        )}
                        {(priceRange[0] !== 0 || priceRange[1] !== 5000000) && (
                            <Badge
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setPriceRange([0, 5000000])}
                            >
                                Price filter
                                <span className="ml-1">×</span>
                            </Badge>
                        )}
                        <button
                            onClick={() => {
                                setSelectedCategory("ALL")
                                setPriceRange([0, 5000000])
                            }}
                            className="text-sm text-primary-600 hover:text-primary-700 underline"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                    </p>
                </div>

                {/* Products Grid */}
                <ProductGrid products={products} emptyMessage="No products found with selected filters" />
            </div>
        </div>
    )
}