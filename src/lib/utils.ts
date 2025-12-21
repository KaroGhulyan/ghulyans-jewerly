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