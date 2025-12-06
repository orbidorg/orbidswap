'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { FiBook, FiCode, FiShield, FiCpu, FiLayers } from 'react-icons/fi'

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0d111c] text-gray-900 dark:text-white font-sans bg-noise">
            <Header />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Documentation
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-[#98a1c0] max-w-2xl mx-auto">
                        Everything you need to know about building on and using OrbidSwap.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar / Navigation */}
                    <div className="md:col-span-1 space-y-2">
                        <div className="bg-gray-50 dark:bg-[#131a2a] rounded-2xl p-6 border border-gray-200 dark:border-[#293249]">
                            <h3 className="font-semibold mb-4 text-blue-500 uppercase text-sm tracking-wider">Getting Started</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                                <li className="hover:text-blue-500 cursor-pointer text-gray-900 dark:text-white font-medium">Introduction</li>
                                <li className="hover:text-blue-500 cursor-pointer">Architecture</li>
                                <li className="hover:text-blue-500 cursor-pointer">Tokenomics</li>
                            </ul>

                            <h3 className="font-semibold mt-8 mb-4 text-violet-500 uppercase text-sm tracking-wider">Developers</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                                <li className="hover:text-blue-500 cursor-pointer">Smart Contracts</li>
                                <li className="hover:text-blue-500 cursor-pointer">SDK Reference</li>
                                <li className="hover:text-blue-500 cursor-pointer">Subgraphs</li>
                            </ul>

                            <h3 className="font-semibold mt-8 mb-4 text-green-500 uppercase text-sm tracking-wider">Security</h3>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                                <li className="hover:text-blue-500 cursor-pointer">Audits</li>
                                <li className="hover:text-blue-500 cursor-pointer">Bug Bounty</li>
                            </ul>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-2 space-y-12">
                        {/* Section 1: Intro */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                    <FiBook size={24} />
                                </div>
                                <h2 className="text-3xl font-bold">Introduction</h2>
                            </div>
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-[#98a1c0]">
                                <p className="mb-4">
                                    OrbidSwap is a decentralized exchange native to World Chain. We leverage the unique identity capabilities of World ID to provide a sybil-resistant, fair, and efficient trading environment.
                                </p>
                                <p>
                                    Our protocol is built on the proven Uniswap V2 architecture, ensuring reliability and ease of integration for existing DeFi tools, but with added layers for human verification and gas optimization.
                                </p>
                            </div>
                        </section>

                        {/* Section 2: Contracts */}
                        <section className="pt-8 border-t border-gray-200 dark:border-[#293249]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500">
                                    <FiCode size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Smart Contracts</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-50 dark:bg-[#131a2a] p-4 rounded-xl border border-gray-200 dark:border-[#293249] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <div>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white block">Factory</span>
                                        <span className="text-xs text-mono text-gray-500 break-all">0x... (See config)</span>
                                    </div>
                                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">Verified</span>
                                </div>
                                <div className="bg-gray-50 dark:bg-[#131a2a] p-4 rounded-xl border border-gray-200 dark:border-[#293249] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <div>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white block">Router</span>
                                        <span className="text-xs text-mono text-gray-500 break-all">0x... (See config)</span>
                                    </div>
                                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">Verified</span>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Architecture */}
                        <section className="pt-8 border-t border-gray-200 dark:border-[#293249]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500">
                                    <FiLayers size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Architecture</h2>
                            </div>
                            <p className="text-gray-600 dark:text-[#98a1c0] mb-4">
                                OrbidSwap uses an Automated Market Maker (AMM) model. Anyone can become a liquidity provider (LP) for a token pair by depositing an equivalent value of each underlying token in return for pool tokens.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
