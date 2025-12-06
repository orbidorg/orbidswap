'use client'

import { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { TokenIcon } from './TokenIcon'

interface TokenSelectorModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (token: any) => void
    excludeToken?: string
}

const COMMON_TOKENS = [
    // World Chain Mainnet Tokens
    { symbol: 'WLD', name: 'Worldcoin', address: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003' },
    { symbol: 'WETH', name: 'Wrapped Ether', address: '0xdBd74deF5339C659719Afd3f533412b5de4D3736' },
    { symbol: 'USDC', name: 'USD Coin', address: '0x79A02482A880bCE3F13e09Da970dC34db4CD24d1' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x03C7054BCB39f7b2e5B2c7AcB37583e32D70Cfa3' },
    { symbol: 'sDAI', name: 'Savings Dai', address: '0x859dbe24b90c9f2f7742083d3cf59ca41f55be5d' },
]

export function TokenSelectorModal({ isOpen, onClose, onSelect, excludeToken }: TokenSelectorModalProps) {
    const [searchQuery, setSearchQuery] = useState('')

    // Filter tokens based on search and exclude already selected token
    const filteredTokens = COMMON_TOKENS.filter(token => {
        if (excludeToken && token.symbol === excludeToken) return false
        if (searchQuery) {
            return token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        }
        return true
    })

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-md bg-white dark:bg-[#131a2a] rounded-3xl border border-gray-200 dark:border-[#293249] overflow-hidden shadow-2xl"
                    >
                        <div className="p-5 border-b border-gray-200 dark:border-[#293249] flex justify-between items-center">
                            <h3 className="text-gray-900 dark:text-white font-medium text-lg">Select a token</h3>
                            <button onClick={onClose} className="text-gray-500 dark:text-[#98a1c0] hover:text-gray-900 dark:hover:text-white transition-colors">
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-5">
                            <div className="relative mb-4">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#98a1c0]" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search name or paste address"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-[#0d111c] border border-transparent dark:border-[#293249] rounded-xl py-3 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#5d6785] focus:border-[#4c82fb] outline-none transition-colors"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {filteredTokens.slice(0, 4).map((token) => (
                                    <button
                                        key={token.symbol}
                                        onClick={() => {
                                            onSelect(token)
                                            onClose()
                                        }}
                                        className="flex items-center gap-2 bg-gray-100 dark:bg-[#0d111c] border border-gray-200 dark:border-[#293249] hover:border-black dark:hover:border-[#4c82fb] rounded-full px-3 py-1.5 transition-all group"
                                    >
                                        <TokenIcon symbol={token.symbol} size={20} />
                                        <span className="text-gray-900 dark:text-white font-medium text-sm group-hover:text-black dark:group-hover:text-[#4c82fb] transition-colors">{token.symbol}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 dark:border-[#293249] pt-4">
                                <div className="text-gray-500 dark:text-[#98a1c0] text-sm mb-2">Available tokens</div>
                                <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {filteredTokens.map((token) => (
                                        <button
                                            key={token.symbol}
                                            onClick={() => {
                                                onSelect(token)
                                                onClose()
                                            }}
                                            className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-[#293249]/50 rounded-xl transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <TokenIcon symbol={token.symbol} size={36} />
                                                <div className="text-left">
                                                    <div className="text-gray-900 dark:text-white font-medium group-hover:text-black dark:group-hover:text-[#4c82fb] transition-colors">{token.name}</div>
                                                    <div className="text-gray-500 dark:text-[#5d6785] text-xs">{token.symbol}</div>
                                                </div>
                                            </div>
                                            <div className="text-gray-900 dark:text-white text-sm">0</div>
                                        </button>
                                    ))}
                                    {filteredTokens.length === 0 && (
                                        <div className="text-center text-gray-400 py-4">No tokens found</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
