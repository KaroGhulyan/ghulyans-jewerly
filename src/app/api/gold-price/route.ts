import { NextResponse } from 'next/server'

interface GoldApiResponse {
    timestamp: number
    metal: string
    currency: string
    exchange: string
    symbol: string
    prev_close_price: number
    open_price: number
    low_price: number
    high_price: number
    open_time: number
    price: number
    ch: number
    chp: number
    ask: number
    bid: number
    price_gram_24k: number
    price_gram_22k: number
    price_gram_21k: number
    price_gram_20k: number
    price_gram_18k: number
    price_gram_16k: number
    price_gram_14k: number
    price_gram_10k: number
}

interface CachedData {
    data: GoldPriceData
    timestamp: number
}

export interface GoldPriceData {
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
}

// In-memory cache — 12 hours TTL to stay within 100 req/month limit
// 100 requests / 30 days = ~3.3 requests per day
// 24 hours / 3.3 = ~7.2 hours. setting to 12h to be safe.
const CACHE_TTL_MS = 12 * 60 * 60 * 1000
let cache: CachedData | null = null

export async function GET() {
    // Return cached data if fresh
    if (cache && Date.now() - cache.timestamp < CACHE_TTL_MS) {
        return NextResponse.json(cache.data)
    }

    const apiKey = process.env.GOLD_API_KEY

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Gold price API key not configured' },
            { status: 503 }
        )
    }

    try {
        // Fetching in USD as per user Code
        const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
            headers: {
                'x-access-token': apiKey,
                'Content-Type': 'application/json',
            },
            next: { revalidate: 43200 }, // 12 hours
        })

        if (!response.ok) {
            throw new Error(`GoldAPI responded with status ${response.status}`)
        }

        const raw: GoldApiResponse = await response.json()

        const data: GoldPriceData = {
            price_per_ounce: Math.round(raw.price),
            price_gram_24k: Math.round(raw.price_gram_24k),
            price_gram_22k: Math.round(raw.price_gram_22k),
            price_gram_21k: Math.round(raw.price_gram_21k),
            price_gram_18k: Math.round(raw.price_gram_18k),
            price_gram_14k: Math.round(raw.price_gram_14k),
            currency: 'USD',
            last_updated: new Date().toISOString(),
            change_percent: raw.chp ?? 0,
            change_amount: Math.round(raw.ch ?? 0),
        }

        // Update cache
        cache = { data, timestamp: Date.now() }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Failed to fetch gold price:', error)

        // Return stale cache if available
        if (cache) {
            return NextResponse.json({
                ...cache.data,
                stale: true,
            })
        }

        return NextResponse.json(
            { error: 'Failed to fetch gold prices' },
            { status: 502 }
        )
    }
}
