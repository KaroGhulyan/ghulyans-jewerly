import { ProductCategory as PrismaProductCategory, Product as PrismaProduct } from '@prisma/client'

// Re-export Prisma's enum
export { ProductCategory } from '@prisma/client'

// Use Prisma's Product type directly
export type Product = PrismaProduct

export interface CreateProductInput {
    name: string;
    nameHy?: string | null;
    description: string;
    descriptionHy?: string | null;
    price: number;
    category: PrismaProductCategory;
    material: string;
    weight?: number | null;
    size?: string | null;
    images: string[];
    inStock?: boolean;
    featured?: boolean;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
    id: string;
}

// Filter and sorting
export interface ProductFilters {
    category?: PrismaProductCategory;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    featured?: boolean;
    search?: string;
}

export interface ProductSort {
    field: "price" | "createdAt" | "name";
    order: "asc" | "desc";
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}