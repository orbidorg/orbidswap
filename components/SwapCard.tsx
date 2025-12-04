'use client'

import { useState } from 'react'
import { Settings, ArrowDown, Info } from 'lucide-react'
import { useAccount, useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function SwapCard() {
    const { isConnected } = useAccount()
    const { connect } = useConnect()

    const [sellAmount, setSellAmount] = useState('')
    const [buyAmount, setBuyAmount] = useState('')

    return (
        <div className="w-full max-w-[480px] bg-[#0d111c] rounded-3xl p-2 border border-[#131a2a] shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 mb-2">
                <div className="flex gap-4">
                    <button className="text-white font-medium text-lg">Swap</button>
                    <button className="text-[#98a1c0] font-medium text-lg hover:text-white transition-colors">Limit</button>
                </div>
                <button className="text-[#98a1c0] hover:text-white transition-colors">
                    <Settings size={20} />
                </button>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-1 relative">
                {/* Sell Input */}
                <div className="bg-[#131a2a] rounded-2xl p-4 hover:border-[#293249] border border-transparent transition-colors">
                    <div className="flex justify-between mb-2">
                        <span className="text-[#98a1c0] text-sm font-medium">You pay</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <input
                            type="number"
                            placeholder="0"
                            value={sellAmount}
                            onChange={(e) => setSellAmount(e.target.value)}
                            className="w-full bg-transparent text-4xl text-white placeholder-[#5d6785] outline-none"
                        />
                        <button className="flex items-center gap-2 bg-[#293249] hover:bg-[#404a67] text-white px-3 py-1.5 rounded-full transition-colors shrink-0">
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs">E</div>
                            <span className="font-semibold text-lg">ETH</span>
                            <ArrowDown size={16} />
                        </button>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-[#5d6785] text-sm">$0.00</span>
                        <span className="text-[#5d6785] text-sm">Balance: 0.00</span>
                    </div>
                </div>

                {/* Arrow Separator */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-[#131a2a] p-1.5 rounded-xl border-[4px] border-[#0d111c]">
                        <ArrowDown size={20} className="text-[#98a1c0]" />
                    </div>
                </div>

                {/* Buy Input */}
                <div className="bg-[#131a2a] rounded-2xl p-4 hover:border-[#293249] border border-transparent transition-colors">
                    <div className="flex justify-between mb-2">
                        <span className="text-[#98a1c0] text-sm font-medium">You receive</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <input
                            type="number"
                            placeholder="0"
                            value={buyAmount}
                            onChange={(e) => setBuyAmount(e.target.value)}
                            className="w-full bg-transparent text-4xl text-white placeholder-[#5d6785] outline-none"
                        />
                        <button className="flex items-center gap-2 bg-[#4c82fb] hover:bg-[#3b66c9] text-white px-3 py-1.5 rounded-full transition-colors shrink-0 shadow-lg shadow-blue-500/20">
                            <span className="font-semibold text-lg">Select token</span>
                            <ArrowDown size={16} />
                        </button>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-[#5d6785] text-sm">$0.00</span>
                        <span className="text-[#5d6785] text-sm">Balance: 0.00</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-2">
                {!isConnected ? (
                    <button
                        onClick={() => connect({ connector: injected() })}
                        className="w-full bg-[#4c82fb]/10 hover:bg-[#4c82fb]/20 text-[#4c82fb] font-semibold text-xl py-4 rounded-2xl transition-all"
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <button className="w-full bg-[#293249] text-[#5d6785] font-semibold text-xl py-4 rounded-2xl cursor-not-allowed">
                        Enter an amount
                    </button>
                )}
            </div>
        </div>
    )
}
