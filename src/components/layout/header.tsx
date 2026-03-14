"use client"

import Link from "next/link"
import { Menu, LogOut, User as UserIcon, Settings, Heart, X } from "lucide-react"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { useLoginModal } from "@/hooks/use-login-modal"
import { useLanguage } from "@/components/providers/language-context"

export function Header() {
    const { t } = useLanguage()
    const { data: session } = useSession()
    const isAdmin = session?.user && (session.user as any).role === "ADMIN"
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const { onOpen } = useLoginModal()

    return (
        <>
            <header
                className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
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

                        {isAdmin && (
                            <Link href="/admin">
                                <Button variant="ghost" size="icon">
                                    <Settings className="h-5 w-5" />
                                </Button>
                            </Link>
                        )}

                        {session ? (
                            <div className="flex items-center gap-2">
                                <Link href="/profile">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative"
                                        title="Favorites"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/profile">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative"
                                        title="Profile"
                                    >
                                        <UserIcon className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    title="Sign Out"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Sign In"
                                onClick={onOpen}
                            >
                                <UserIcon className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Outside header to avoid stacking context issues */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    
                    {/* Drawer */}
                    <div className="fixed top-0 left-0 bottom-0 w-[280px] h-full bg-white flex flex-col shadow-2xl z-[101] animate-in slide-in-from-left duration-300">
                        <div className="h-16 flex items-center justify-between px-6 border-b shrink-0 bg-white">
                            <span className="font-bold text-lg bg-gradient-gold bg-clip-text text-transparent">
                                Menu
                            </span>
                            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="h-5 w-5 text-gray-900" />
                            </Button>
                        </div>
                        
                        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2 bg-white">
                            <Link
                                href="/"
                                className="px-4 py-3 rounded-lg text-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t.nav.home}
                            </Link>
                            <Link
                                href="/products"
                                className="px-4 py-3 rounded-lg text-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t.nav.products}
                            </Link>
                            <Link
                                href="/#gold-prices"
                                className="px-4 py-3 rounded-lg text-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t.nav.goldPrices}
                            </Link>
                            <Link
                                href="/featured"
                                className="px-4 py-3 rounded-lg text-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t.nav.featured}
                            </Link>
                            <Link
                                href="/about"
                                className="px-4 py-3 rounded-lg text-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t.nav.about}
                            </Link>
                            
                            {isAdmin && (
                                <div className="mt-4 pt-4 border-t">
                                    <Link
                                        href="/admin"
                                        className="px-4 py-3 rounded-lg text-lg font-medium text-amber-600 hover:bg-amber-50 transition-colors flex items-center gap-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Settings className="h-5 w-5" />
                                        Admin Panel
                                    </Link>
                                </div>
                            )}
                        </nav>
                        
                        <div className="p-4 border-t bg-gray-50 mt-auto">
                            <p className="text-center text-xs text-gray-500">
                                © 2024 Ghulyan's Jewelry
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}