'use client'

import { Header } from '@/components/Header'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d111c] text-white font-sans selection:bg-[#4c82fb] selection:text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-[#98a1c0] bg-clip-text text-transparent">
            Swap with confidence on World Chain
          </h1>
          <p className="text-xl text-[#98a1c0] mb-10 max-w-2xl mx-auto leading-relaxed">
            The most intuitive DEX for seamless token swaps and liquidity provision.
            Experience low fees, fast transactions, and a premium interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/swap">
              <button className="bg-[#4c82fb] hover:bg-[#3b66c9] text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95">
                Launch App <FiArrowRight />
              </button>
            </Link>
            <Link href="/explore">
              <button className="bg-[#131a2a] border border-[#293249] hover:border-[#4c82fb] text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95">
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
          <div className="bg-[#131a2a]/50 backdrop-blur-md border border-[#293249] p-6 rounded-3xl">
            <div className="text-[#98a1c0] text-sm font-medium mb-1">Total Value Locked</div>
            <div className="text-3xl font-bold text-white">$1.2M+</div>
          </div>
          <div className="bg-[#131a2a]/50 backdrop-blur-md border border-[#293249] p-6 rounded-3xl">
            <div className="text-[#98a1c0] text-sm font-medium mb-1">Total Volume</div>
            <div className="text-3xl font-bold text-white">$450K+</div>
          </div>
          <div className="bg-[#131a2a]/50 backdrop-blur-md border border-[#293249] p-6 rounded-3xl">
            <div className="text-[#98a1c0] text-sm font-medium mb-1">Total Pairs</div>
            <div className="text-3xl font-bold text-white">150+</div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl text-left">
          <div className="p-6 rounded-3xl hover:bg-[#131a2a] transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <FiZap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-[#98a1c0]">Optimized for World Chain's high-speed infrastructure, ensuring your trades execute in milliseconds.</p>
          </div>
          <div className="p-6 rounded-3xl hover:bg-[#131a2a] transition-colors group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
              <FiShield size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure & Audited</h3>
            <p className="text-[#98a1c0]">Built on battle-tested Uniswap V2 contracts, providing a secure environment for your assets.</p>
          </div>
          <div className="p-6 rounded-3xl hover:bg-[#131a2a] transition-colors group">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
              <FiTrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Yield Farming</h3>
            <p className="text-[#98a1c0]">Provide liquidity to your favorite pools and earn trading fees on every swap.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
