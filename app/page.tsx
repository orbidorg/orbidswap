'use client'

import { Header } from '@/components/Header'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi'
import { useReadContract, useReadContracts, useGasPrice } from 'wagmi'
import { FACTORY_ADDRESS, FACTORY_ABI, PAIR_ABI, WETH_ADDRESS } from '@/config/contracts'
import { formatUnits } from 'viem'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'

export default function LandingPage() {
  const [tvlEth, setTvlEth] = useState('0')

  // 1. Total Pairs
  const { data: allPairsLength } = useReadContract({
    address: FACTORY_ADDRESS as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: 'allPairsLength',
  })

  // 2. Gas Price
  const { data: gasPrice } = useGasPrice()

  // 3. Calculate TVL (Approx from first 10 pairs)
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

    let totalEth = 0

    for (let i = 0; i < pairAddresses.length; i++) {
      const baseIndex = i * 3
      const token0 = pairsData[baseIndex]?.result as unknown as string
      const token1 = pairsData[baseIndex + 1]?.result as unknown as string
      const reserves = pairsData[baseIndex + 2]?.result as unknown as [bigint, bigint, number]

      if (token0 && token1 && reserves) {
        // Check if one of the tokens is WETH
        if (token0.toLowerCase() === WETH_ADDRESS.toLowerCase()) {
          totalEth += Number(formatUnits(reserves[0], 18)) * 2
        } else if (token1.toLowerCase() === WETH_ADDRESS.toLowerCase()) {
          totalEth += Number(formatUnits(reserves[1], 18)) * 2
        }
      }
    }
    setTvlEth(totalEth.toFixed(2))
  }, [pairsData, pairAddresses])

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d111c] text-gray-900 dark:text-white font-sans selection:bg-black dark:selection:bg-[#4c82fb] selection:text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-100 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gray-50 dark:bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-gray-900 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:to-[#98a1c0] dark:bg-clip-text">
            Swap with confidence on World Chain
          </h1>
          <p className="text-xl text-gray-500 dark:text-[#98a1c0] mb-10 max-w-2xl mx-auto leading-relaxed">
            The most intuitive DEX for seamless token swaps and liquidity provision.
            Experience low fees, fast transactions, and a premium interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/swap">
              <button className="bg-black dark:bg-[#4c82fb] hover:bg-gray-800 dark:hover:bg-[#3b66c9] text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-black/10 dark:shadow-blue-500/25 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
                Launch App <FiArrowRight />
              </button>
            </Link>
            <Link href="/explore">
              <button className="bg-white dark:bg-[#131a2a] border border-gray-200 dark:border-[#293249] hover:border-black dark:hover:border-[#4c82fb] text-gray-900 dark:text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                Explore Pools
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          <div className="bg-white/50 dark:bg-[#131a2a]/50 backdrop-blur-md border border-gray-200 dark:border-[#293249] p-6 rounded-3xl shadow-sm dark:shadow-none">
            <div className="text-gray-500 dark:text-[#98a1c0] text-sm font-medium mb-1">Total Pairs</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{allPairsLength ? allPairsLength.toString() : '0'}</div>
          </div>
          <div className="bg-white/50 dark:bg-[#131a2a]/50 backdrop-blur-md border border-gray-200 dark:border-[#293249] p-6 rounded-3xl shadow-sm dark:shadow-none">
            <div className="text-gray-500 dark:text-[#98a1c0] text-sm font-medium mb-1">Tracked Liquidity (WLD)</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{tvlEth} WLD</div>
          </div>
          <div className="bg-white/50 dark:bg-[#131a2a]/50 backdrop-blur-md border border-gray-200 dark:border-[#293249] p-6 rounded-3xl shadow-sm dark:shadow-none">
            <div className="text-gray-500 dark:text-[#98a1c0] text-sm font-medium mb-1">Current Gas</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{gasPrice ? formatUnits(gasPrice, 9).slice(0, 4) : '0'} Gwei</div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl text-left">
          <div className="p-6 rounded-3xl hover:bg-gray-50 dark:hover:bg-[#131a2a] transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <FiZap size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-500 dark:text-[#98a1c0]">Optimized for World Chain&apos;s high-speed infrastructure, ensuring your trades execute in milliseconds.</p>
          </div>
          <div className="p-6 rounded-3xl hover:bg-gray-50 dark:hover:bg-[#131a2a] transition-colors group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
              <FiShield size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure & Audited</h3>
            <p className="text-gray-500 dark:text-[#98a1c0]">Built on battle-tested Uniswap V2 contracts, providing a secure environment for your assets.</p>
          </div>
          <div className="p-6 rounded-3xl hover:bg-gray-50 dark:hover:bg-[#131a2a] transition-colors group">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
              <FiTrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Yield Farming</h3>
            <p className="text-gray-500 dark:text-[#98a1c0]">Provide liquidity to your favorite pools and earn trading fees on every swap.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
