import { useState, useEffect } from 'react'

// CoinGecko IDs for our tokens
const COINGECKO_IDS = {
    'WLD': 'worldcoin-wld',
    'ETH': 'ethereum',
    'WETH': 'weth',
    'USDC': 'usd-coin',
    'WBTC': 'wrapped-bitcoin',
    'sDAI': 'savings-dai',
}

export function useTokenPrices() {
    const [prices, setPrices] = useState<Record<string, number>>({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // Fetch WLD, ETH, USDC, WBTC, DAI...
                const ids = Object.values(COINGECKO_IDS).join(',')
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
                )

                if (!response.ok) throw new Error('Failed to fetch prices')

                const data = await response.json()

                const newPrices: Record<string, number> = {}

                // Map back to our symbols
                Object.entries(COINGECKO_IDS).forEach(([symbol, geckoId]) => {
                    if (data[geckoId]?.usd) {
                        newPrices[symbol] = data[geckoId].usd
                    }
                })

                setPrices(newPrices)
            } catch (error) {
                console.error('Error fetching token prices:', error)
                // Fallback hardcoded prices (approximate) to prevent UI breakage
                setPrices({
                    'WLD': 2.50,
                    'ETH': 3500,
                    'WETH': 3500,
                    'USDC': 1.00,
                    'WBTC': 65000,
                    'sDAI': 1.05
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchPrices()
        // Refresh every 60 seconds
        const interval = setInterval(fetchPrices, 60000)
        return () => clearInterval(interval)
    }, [])

    return { prices, isLoading }
}
