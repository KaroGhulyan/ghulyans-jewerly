import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "AMD"): string {
    return new Intl.NumberFormat("hy-AM", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    }).format(price);
}

export function formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString("hy-AM", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function getGoogleDriveDirectLink(url: string): string {
    if (!url.includes("drive.google.com") && !url.includes("googleusercontent.com")) return url;
    
    // Extract ID from various Google Drive link formats
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                       url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
                       url.match(/\/d\/([a-zA-Z0-9_-]+)/);
                       
    if (fileIdMatch && fileIdMatch[1]) {
        // This format is often more reliable for direct embedding
        return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }

    return url;
}