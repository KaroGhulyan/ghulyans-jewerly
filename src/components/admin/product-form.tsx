"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Product } from "@prisma/client"

const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().min(0, "Price must be positive"),
    originalPrice: z.coerce.number().optional(),
    category: z.string().min(1, "Category is required"),
    material: z.string().min(1, "Material is required"),
    images: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
    initialData?: Product | null
}

export function ProductForm({ initialData }: ProductFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ? {
            ...initialData,
            images: initialData.images?.[0] || "",
        } : {
            name: "",
            description: "",
            price: 0,
            category: "",
            material: "",
            images: "",
            inStock: true,
            featured: false,
        },
    })

    async function onSubmit(data: ProductFormValues) {
        setIsLoading(true)
        try {
            if (initialData) {
                await fetch(`/api/products/${initialData.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })
            } else {
                await fetch("/api/products", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })
            }
            router.refresh()
            router.push("/admin")
        } catch (error) {
            console.error("Something went wrong", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Gold Ring with Diamond" {...form.register("name")} />
                    {form.formState.errors.name && (
                        <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Detailed description of the product..."
                        {...form.register("description")}
                    />
                    {form.formState.errors.description && (
                        <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="price">Price (AMD)</Label>
                        <Input id="price" type="number" {...form.register("price")} />
                        {form.formState.errors.price && (
                            <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...form.register("category")}
                        >
                            <option value="">Select a category</option>
                            <option value="RING">Ring</option>
                            <option value="NECKLACE">Necklace</option>
                            <option value="BRACELET">Bracelet</option>
                            <option value="EARRINGS">Earrings</option>
                            <option value="PENDANT">Pendant</option>
                            <option value="SET">Set</option>
                            <option value="OTHER">Other</option>
                        </select>
                        {form.formState.errors.category && (
                            <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="material">Material</Label>
                    <Input id="material" placeholder="e.g. 18k Gold" {...form.register("material")} />
                    {form.formState.errors.material && (
                        <p className="text-sm text-red-500">{form.formState.errors.material.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="images">Image URL</Label>
                    <Input id="images" placeholder="https://..." {...form.register("images")} />
                    <p className="text-xs text-muted-foreground">Enter a direct link to an image.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="inStock"
                            checked={form.watch("inStock")}
                            onCheckedChange={(checked) => form.setValue("inStock", checked as boolean)}
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="featured"
                            checked={form.watch("featured")}
                            onCheckedChange={(checked) => form.setValue("featured", checked as boolean)}
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : initialData ? "Update Product" : "Create Product"}
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/admin">Cancel</Link>
                </Button>
            </div>
        </form>
    )
}
