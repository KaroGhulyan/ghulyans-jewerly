"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-context"

export function Hero() {
    const { t } = useLanguage()

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/intro.gif"
                    alt="Jewelry Intro"
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in-up">
                        {t.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                        {t.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Button size="lg" className="bg-white text-stone-900 font-medium hover:bg-gray-100 hover:text-stone-900 border border-transparent shadow-xl" asChild>
                            <Link href="/products">
                                {t.hero.shopAll}
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white backdrop-blur-sm" asChild>
                            <Link href="/featured">
                                {t.hero.featured}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
