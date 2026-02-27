"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { useLanguage } from "@/components/providers/language-context"

export function Header() {
    const { t } = useLanguage()

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
                {/* Mobile Menu Button */}
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                            Ghulyan's Jewelry
                        </span>
                        <span className="text-xs text-gray-500 hidden sm:block">
                            Handcrafted with Love
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium transition-colors hover:text-primary-600"
                    >
                        {t.nav.home}
                    </Link>
                    <Link
                        href="/products"
                        className="text-sm font-medium transition-colors hover:text-primary-600"
                    >
                        {t.nav.products}
                    </Link>
                    <Link
                        href="/#gold-prices"
                        className="text-sm font-medium transition-colors hover:text-primary-600"
                    >
                        {t.nav.goldPrices}
                    </Link>
                    <Link
                        href="/featured"
                        className="text-sm font-medium transition-colors hover:text-primary-600"
                    >
                        {t.nav.featured}
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium transition-colors hover:text-primary-600"
                    >
                        {t.nav.about}
                    </Link>
                </nav>

                {/* Right Side Icons */}
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {/* Cart Count Badge */}
                        <span
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                            0
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}