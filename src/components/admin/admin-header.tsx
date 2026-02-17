"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useLanguage } from "@/components/providers/language-context"
import { LanguageSwitcher } from "@/components/layout/language-switcher"

export function AdminHeader() {
    const { t } = useLanguage()

    return (
        <div className="flex items-center justify-between border-b px-4 py-4 md:px-6">
            <div className="flex items-center gap-4">
                <Link href="/" className="font-bold text-lg hover:underline">
                    &larr; {t.admin.backToSite}
                </Link>
                <h1 className="text-xl font-bold border-l pl-4 ml-4">{t.admin.dashboard}</h1>
            </div>
            <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <Button asChild>
                    <Link href="/admin/products/new">
                        <Plus className="mr-2 h-4 w-4" />
                        {t.admin.addProduct}
                    </Link>
                </Button>
            </div>
        </div>
    )
}
