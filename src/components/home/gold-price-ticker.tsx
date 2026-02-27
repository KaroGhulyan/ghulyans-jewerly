"use client"

import { useEffect, useState, useCallback } from "react"
import { useLanguage } from "@/components/providers/language-context"
import { TrendingUp, TrendingDown, RefreshCw, Minus } from "lucide-react"

interface GoldPriceData {
    price_per_ounce: number
    price_gram_24k: number
    price_gram_22k: number
    price_gram_21k: number
    price_gram_18k: number
    price_gram_14k: number
    currency: string
    last_updated: string
    change_percent: number
    change_amount: number
    stale?: boolean
}

const KARAT_LABELS = ["24K", "22K", "21K", "18K", "14K"] as const
const KARAT_KEYS = [
    "price_gram_24k",
    "price_gram_22k",
    "price_gram_21k",
    "price_gram_18k",
    "price_gram_14k",
] as const

function formatAMD(value: number): string {
    return new Intl.NumberFormat("en-US").format(value)
}

function ShimmerCard() {
    return (
        <div className="animate-pulse rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 p-5 space-y-3">
            <div className="h-4 w-12 bg-amber-200/60 rounded" />
            <div className="h-7 w-24 bg-amber-200/60 rounded" />
            <div className="h-3 w-16 bg-amber-200/40 rounded" />
        </div>
    )
}

export function GoldPriceTicker() {
    const { t } = useLanguage()
    const [data, setData] = useState<GoldPriceData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchPrices = useCallback(async () => {
        try {
            setLoading(true)
            setError(false)
            const res = await fetch("/api/gold-price")
            if (!res.ok) throw new Error("Failed")
            const json: GoldPriceData = await res.json()
            setData(json)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPrices()
        // Auto-refresh every 5 minutes
        const interval = setInterval(fetchPrices, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [fetchPrices])

    const isPositive = data ? data.change_percent >= 0 : true

    return (
        <section id="gold-prices" className="relative py-20 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Gold shimmer line at the top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

            <div className="relative container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <span className="text-lg">🪙</span>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    {t.goldPrice.title}
                                </h2>
                                <p className="text-amber-200/60 text-sm">
                                    {t.goldPrice.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Live badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-medium text-emerald-400">
                                {t.goldPrice.livePrice}
                            </span>
                        </div>

                        {/* Refresh button */}
                        <button
                            onClick={fetchPrices}
                            disabled={loading}
                            className="p-2 rounded-lg text-amber-400/60 hover:text-amber-300 hover:bg-white/5 transition-all duration-200 disabled:opacity-30"
                            title="Refresh"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Troy Ounce overview bar */}
                {!error && data && (
                    <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-baseline gap-3">
                                <span className="text-sm text-amber-200/50 uppercase tracking-wider font-medium">
                                    {t.goldPrice.troyOunce}
                                </span>
                                <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                                    ${formatAMD(data.price_per_ounce)}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Change indicator */}
                                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium ${data.change_percent === 0
                                    ? "bg-gray-500/10 text-gray-400"
                                    : isPositive
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "bg-red-500/10 text-red-400"
                                    }`}>
                                    {data.change_percent === 0 ? (
                                        <Minus className="h-3.5 w-3.5" />
                                    ) : isPositive ? (
                                        <TrendingUp className="h-3.5 w-3.5" />
                                    ) : (
                                        <TrendingDown className="h-3.5 w-3.5" />
                                    )}
                                    <span className="tabular-nums">
                                        {isPositive ? "+" : ""}
                                        {data.change_percent.toFixed(2)}%
                                    </span>
                                </div>

                                {/* Last updated */}
                                {data.last_updated && (
                                    <span className="text-xs text-white/30">
                                        {t.goldPrice.lastUpdated}:{" "}
                                        {new Date(data.last_updated).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && !data && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300/80 text-sm">
                            <span>⚠️</span>
                            {t.goldPrice.unavailable}
                        </div>
                    </div>
                )}

                {/* Loading skeletons */}
                {loading && !data && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <ShimmerCard key={i} />
                        ))}
                    </div>
                )}

                {/* Price cards */}
                {data && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {KARAT_LABELS.map((label, i) => {
                            const key = KARAT_KEYS[i]
                            const price = data[key]
                            const isPrimary = label === "24K"

                            return (
                                <div
                                    key={label}
                                    className={`group relative rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-default ${isPrimary
                                        ? "bg-gradient-to-br from-amber-400/20 via-yellow-500/10 to-amber-600/20 border border-amber-400/30 shadow-lg shadow-amber-500/10"
                                        : "bg-white/[0.04] border border-white/[0.08] hover:border-amber-400/20 hover:bg-white/[0.06]"
                                        }`}
                                >
                                    {/* Glow effect on primary */}
                                    {isPrimary && (
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}

                                    <div className="relative space-y-3">
                                        {/* Karat badge */}
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs font-bold tracking-widest uppercase ${isPrimary ? "text-amber-300" : "text-amber-200/40"
                                                }`}>
                                                {label}
                                            </span>
                                            {isPrimary && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-semibold uppercase tracking-wider">
                                                    Pure
                                                </span>
                                            )}
                                        </div>

                                        {/* Price */}
                                        <div className="space-y-1">
                                            <div className={`text-xl md:text-2xl font-bold tabular-nums ${isPrimary ? "text-amber-100" : "text-white/90"
                                                }`}>
                                                ${formatAMD(price)}
                                            </div>
                                            <div className="text-[11px] text-white/30 uppercase tracking-wider">
                                                {t.goldPrice.perGram}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Stale data indicator */}
                {data?.stale && (
                    <div className="mt-4 text-center">
                        <span className="text-xs text-amber-500/50 italic">
                            Showing cached prices — live data temporarily unavailable
                        </span>
                    </div>
                )}
            </div>
        </section>
    )
}
