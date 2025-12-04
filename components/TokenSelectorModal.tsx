'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface Token {
    symbol: string
    name: string
    address: string
    logo?: string
}

interface TokenSelectorModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (token: Token) => void
}

const COMMON_TOKENS: Token[] = [
    { symbol: 'ETH', name: 'Ether', address: '0x0000000000000000000000000000000000000000' },
    { symbol: 'WETH', name: 'Wrapped Ether', address: '0xdBd74deF5339C659719Afd3f533412b5de4D3736' },
    { symbol: 'USDC', name: 'USD Coin', address: '0x...' }, // Placeholder
    { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x...' }, // Placeholder
]

export function TokenSelectorModal({ isOpen, onClose, onSelect }: TokenSelectorModalProps) {
    const [searchQuery, setSearchQuery] = useState('')

    if (!isOpen) return null

    const filteredTokens = COMMON_TOKENS.filter(token =>
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#0d111c] rounded-3xl border border-[#293249] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="p-5 pb-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-medium text-lg">Select a token</h3>
                        <button onClick={onClose} className="text-[#98a1c0] hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#98a1c0]">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search name or paste address"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#131a2a] border border-[#293249] rounded-2xl py-3 pl-12 pr-4 text-white placeholder-[#98a1c0] focus:outline-none focus:border-[#4c82fb] focus:ring-1 focus:ring-[#4c82fb] transition-all text-lg"
                            autoFocus
                        />
                    </div>

                    {/* Common Tokens */}
                    <div className="flex gap-2 flex-wrap mb-4">
                        {COMMON_TOKENS.slice(0, 4).map((token) => (
                            <button
                                key={token.symbol}
                                onClick={() => { onSelect(token); onClose(); }}
                                className="flex items-center gap-2 bg-[#131a2a] hover:bg-[#293249] border border-[#293249] rounded-full px-3 py-1.5 transition-colors"
                            >
                                {/* Placeholder Logo */}
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                                    {token.symbol[0]}
                                </div>
                                <span className="text-white font-medium">{token.symbol}</span>
                            </button>
                        ))}
                    </div>

                    <div className="h-px bg-[#293249] w-full" />
                </div>

                {/* Token List */}
                <div className="flex-1 overflow-y-auto p-2">
                    {filteredTokens.map((token) => (
                        <button
                            key={token.symbol}
                            onClick={() => { onSelect(token); onClose(); }}
                            className="w-full flex items-center justify-between p-3 hover:bg-[#131a2a] rounded-xl transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                    {token.symbol[0]}
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-white font-medium text-lg">{token.symbol}</span>
                                    <span className="text-[#98a1c0] text-sm group-hover:text-[#98a1c0]/80">{token.name}</span>
                                </div>
                            </div>
                            {/* Balance placeholder */}
                            <span className="text-white font-medium">0</span>
                        </button>
                    ))}
                    {filteredTokens.length === 0 && (
                        <div className="p-8 text-center text-[#98a1c0]">
                            No tokens found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
