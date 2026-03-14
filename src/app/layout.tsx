import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Armenian Jewelry Store | Handcrafted Jewelry",
    description: "Beautiful handcrafted jewelry from Armenia. Rings, necklaces, bracelets, and more.",
};

import { LanguageProvider } from "@/components/providers/language-context";
import { AuthProvider } from "@/components/providers/auth-provider";

// ... (other imports)

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
                <AuthProvider>
                    <LanguageProvider>
                        <Header />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </LanguageProvider>
                </AuthProvider>
            </body>
        </html>
    );
}