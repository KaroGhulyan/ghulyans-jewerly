"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-context"

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    return (
        <div className="flex items-center gap-1">
            <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="text-xs h-7 px-2"
            >
                Eng
            </Button>
            <Button
                variant={language === 'hy' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('hy')}
                className="text-xs h-7 px-2"
            >
                Hay
            </Button>
        </div>
    )
}
