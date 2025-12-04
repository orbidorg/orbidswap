'use client'

import { Header } from '../../components/Header'
import { AddLiquidityModal } from '../../components/AddLiquidityModal'
import { RemoveLiquidityModal } from '../../components/RemoveLiquidityModal'
import { useState } from 'react'
import { useAccount } from 'wagmi'

export default function Pool() {
    const { isConnected } = useAccount()
    const [isAddLiquidityOpen, setIsAddLiquidityOpen] = useState(false)
    const [isRemoveLiquidityOpen, setIsRemoveLiquidityOpen] = useState(false)
    const [selectedPair, setSelectedPair] = useState<any>(null)

    // Mock positions for demonstration
    // In a real app, we would fetch these from the subgraph or by checking common pairs
    const positions = [
        {
            pairAddress: '0x...',
            tokenA: { symbol: 'ETH', address: '0x...' },
            tokenB: { symbol: 'USDC', address: '0x...' },
            liquidity: '1.234',
            share: '0.01%'
        }
    ]

    const handleRemoveClick = (position: any) => {
        setSelectedPair(position)
        setIsRemoveLiquidityOpen(true)
    }

    return (
        <div className="min-h-screen bg-[#0d111c] text-white font-sans selection:bg-[#4c82fb] selection:text-white">
            <Header />
            <main className="flex flex-col items-center justify-center p-4 mt-20">
                <div className="w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold">Pools</h1>
                        <button
                            onClick={() => setIsAddLiquidityOpen(true)}
                            className="bg-[#4c82fb] hover:bg-[#3b66c9] text-white font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                            + New Position
                        </button>
                    </div>

                    {!isConnected ? (
                        <div className="bg-[#131a2a] rounded-3xl p-8 border border-[#293249] text-center">
                            <p className="text-[#98a1c0] text-lg">Connect your wallet to view your liquidity positions.</p>
                        </div>
                    ) : positions.length === 0 ? (
                        <div className="bg-[#131a2a] rounded-3xl p-8 border border-[#293249] text-center">
                            <p className="text-[#98a1c0] text-lg">No active liquidity positions found.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {positions.map((pos, i) => (
                                <div key={i} className="bg-[#131a2a] rounded-3xl p-6 border border-[#293249] hover:border-[#4c82fb] transition-colors">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#131a2a]"></div>
                                                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#131a2a]"></div>
                                            </div>
                                            <span className="font-bold text-lg">{pos.tokenA.symbol}/{pos.tokenB.symbol}</span>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveClick(pos)}
                                            className="text-[#4c82fb] font-medium hover:text-[#3b66c9] transition-colors"
                                        >
                                            Manage
                                        </button>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#98a1c0]">Your Liquidity</span>
                                        <span className="text-white font-medium">{pos.liquidity} LP</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-[#98a1c0]">Share of Pool</span>
                                        <span className="text-white font-medium">{pos.share}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <AddLiquidityModal
                isOpen={isAddLiquidityOpen}
                onClose={() => setIsAddLiquidityOpen(false)}
            />

            {selectedPair && (
                <RemoveLiquidityModal
                    isOpen={isRemoveLiquidityOpen}
                    onClose={() => setIsRemoveLiquidityOpen(false)}
                    pairAddress={selectedPair.pairAddress}
                    tokenA={selectedPair.tokenA}
                    tokenB={selectedPair.tokenB}
                />
            )}
        </div>
    )
}
