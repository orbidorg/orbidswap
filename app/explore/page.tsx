'use client'

import { Header } from '../../components/Header'
import { useReadContract, useReadContracts } from 'wagmi'
import { FACTORY_ADDRESS, FACTORY_ABI, PAIR_ABI } from '../../config/contracts'
import { formatUnits } from 'viem'
import { useEffect, useState } from 'react'

export default function Explore() {
    const [pools, setPools] = useState<any[]>([])

    // 1. Get total pairs length
    const { data: allPairsLength } = useReadContract({
        address: FACTORY_ADDRESS as `0x${string}`,
        abi: FACTORY_ABI,
        functionName: 'allPairsLength',
    })

    // 2. Prepare hooks to fetch first 10 pairs
    const pairsCount = allPairsLength ? Number(allPairsLength) : 0
    const pairsToFetch = Math.min(pairsCount, 10)
    const pairIndexes = Array.from({ length: pairsToFetch }, (_, i) => BigInt(i))

    const { data: pairAddresses } = useReadContracts({
        contracts: pairIndexes.map(index => ({
            address: FACTORY_ADDRESS as `0x${string}`,
            abi: FACTORY_ABI,
            functionName: 'allPairs',
            args: [index],
        }))
    })

    // 3. Fetch data for these pairs
    const { data: pairsData } = useReadContracts({
        contracts: pairAddresses?.flatMap(result => {
            const pairAddress = result.result as unknown as `0x${string}`
            if (!pairAddress) return []
            return [
                { address: pairAddress, abi: PAIR_ABI, functionName: 'token0' },
                { address: pairAddress, abi: PAIR_ABI, functionName: 'token1' },
                { address: pairAddress, abi: PAIR_ABI, functionName: 'getReserves' },
            ]
        }) || [],
        query: {
            enabled: !!pairAddresses
        }
    })

    useEffect(() => {
        if (!pairsData || !pairAddresses) return

        const processPools = () => {
            const loadedPools: any[] = []

            for (let i = 0; i < pairAddresses.length; i++) {
                const baseIndex = i * 3
                const pairAddress = pairAddresses[i].result as unknown as string
                const token0 = pairsData[baseIndex]?.result as unknown as string
                const token1 = pairsData[baseIndex + 1]?.result as unknown as string
                const reserves = pairsData[baseIndex + 2]?.result as unknown as [bigint, bigint, number]

                if (pairAddress && token0 && token1 && reserves) {
                    loadedPools.push({
                        address: pairAddress,
                        token0,
                        token1,
                        reserve0: formatUnits(reserves[0], 18), // Assuming 18 decimals for simplicity
                        reserve1: formatUnits(reserves[1], 18),
                    })
                }
            }
            setPools(loadedPools)
        }

        processPools()
    }, [pairsData, pairAddresses])

    return (
        <div className="min-h-screen bg-white dark:bg-[#0d111c] text-gray-900 dark:text-white font-sans selection:bg-black dark:selection:bg-[#4c82fb] selection:text-white">
            <Header />
            <main className="flex flex-col items-center justify-center p-4 mt-20">
                <div className="w-full max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Explore</h1>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Top Pools */}
                        <div className="bg-white dark:bg-[#131a2a] rounded-3xl p-6 border border-gray-200 dark:border-[#293249] shadow-sm dark:shadow-none">
                            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">All Pools</h2>
                            {pools.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 dark:text-[#98a1c0]">
                                    {pairsCount === 0 ? "No pools found." : "Loading pools..."}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {pools.map((pool, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#293249]/50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-[#4c82fb]/30">
                                            <div className="flex items-center gap-4">
                                                <span className="text-gray-400 dark:text-[#98a1c0] w-6 font-mono">#{i + 1}</span>
                                                <div className="flex -space-x-2">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white dark:border-[#131a2a]"></div>
                                                    <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white dark:border-[#131a2a]"></div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-gray-900 dark:text-white">Pool {pool.address.slice(0, 6)}...{pool.address.slice(-4)}</div>
                                                    <div className="text-gray-500 dark:text-[#98a1c0] text-sm font-mono">
                                                        {pool.token0.slice(0, 6)}... / {pool.token1.slice(0, 6)}...
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-gray-400 dark:text-[#98a1c0] text-xs uppercase tracking-wider mb-1">Reserves</div>
                                                <div className="font-mono text-sm text-gray-900 dark:text-white">
                                                    {parseFloat(pool.reserve0).toFixed(2)} <span className="text-gray-500 dark:text-[#5d6785]">TKN0</span>
                                                </div>
                                                <div className="font-mono text-sm text-gray-900 dark:text-white">
                                                    {parseFloat(pool.reserve1).toFixed(2)} <span className="text-gray-500 dark:text-[#5d6785]">TKN1</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
