'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSettings, FiArrowDown, FiClock, FiInfo } from 'react-icons/fi'
import { useAccount, useConnect } from 'wagmi'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TokenSelectorModal } from '@/components/TokenSelectorModal'
import { SettingsModal } from '@/components/SettingsModal'

export default function LimitPage() {
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()

    const [sellToken, setSellToken] = useState({ symbol: 'WLD', name: 'Worldcoin', address: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003' })
    const [buyToken, setBuyToken] = useState<null | { symbol: string; name: string; address: string }>(null)
    const [sellAmount, setSellAmount] = useState('')
    const [limitPrice, setLimitPrice] = useState('')
    const [expiry, setExpiry] = useState('24h')

    const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [selectorMode, setSelectorMode] = useState<'sell' | 'buy'>('sell')
    const [slippage, setSlippage] = useState('auto')
    const [deadline, setDeadline] = useState('20')

    const handleConnect = () => {
        const injectedConnector = connectors.find(c => c.id === 'injected') || connectors[0]
        if (injectedConnector) {
            connect({ connector: injectedConnector })
        }
    }

    const openTokenSelector = (mode: 'sell' | 'buy') => {
        setSelectorMode(mode)
        setIsTokenSelectorOpen(true)
    }

    const handleTokenSelect = (token: any) => {
        if (selectorMode === 'sell') {
            setSellToken(token)
        } else {
            setBuyToken(token)
        }
    }

    const handleSwapTokens = () => {
        if (buyToken) {
            const temp = sellToken
            setSellToken(buyToken)
            setBuyToken(temp)
        }
    }

    // Calculate receive amount based on limit price
    const receiveAmount = sellAmount && limitPrice
        ? (parseFloat(sellAmount) * parseFloat(limitPrice)).toFixed(6)
        : ''

    return (
        <div className="min-h-screen bg-white dark:bg-[#0d111c] text-gray-900 dark:text-white font-sans selection:bg-black dark:selection:bg-[#4c82fb] selection:text-white bg-noise">
            <Header />

            <main className="flex flex-col items-center justify-center p-4 pt-28 pb-20 min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[480px] bg-white dark:bg-[#131a2a] rounded-3xl border border-gray-200 dark:border-[#293249] p-6 shadow-xl"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                                <FiClock className="text-white" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Limit Order</h2>
                                <p className="text-xs text-gray-500 dark:text-[#5d6785]">Set your price</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-[#293249] rounded-xl transition-colors"
                        >
                            <FiSettings size={20} className="text-gray-500 dark:text-[#98a1c0]" />
                        </button>
                    </div>

                    {/* Coming Soon Banner */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-2xl p-5 mb-6">
                        <div className="flex items-center gap-2 text-blue-500 font-semibold mb-2">
                            <FiInfo size={18} />
                            Coming Soon
                        </div>
                        <p className="text-sm text-gray-600 dark:text-[#98a1c0]">
                            Limit orders will be available in a future update. Set your price and we&apos;ll execute when the market matches.
                        </p>
                    </div>

                    {/* Sell Input */}
                    <div className="relative">
                        <div className="bg-gray-50 dark:bg-[#0d111c] rounded-2xl p-5 mb-1">
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-500 dark:text-[#98a1c0] text-sm font-medium">You sell</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={sellAmount}
                                    onChange={(e) => setSellAmount(e.target.value)}
                                    className="w-full bg-transparent text-4xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#5d6785] outline-none"
                                />
                                <button
                                    onClick={() => openTokenSelector('sell')}
                                    className="flex items-center gap-2 bg-white dark:bg-[#293249] hover:bg-gray-100 dark:hover:bg-[#404a67] text-gray-900 dark:text-white px-4 py-2 rounded-full transition-colors shrink-0 shadow-sm"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                        {sellToken.symbol[0]}
                                    </div>
                                    <span className="font-semibold text-lg">{sellToken.symbol}</span>
                                    <FiArrowDown size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Swap Button */}
                        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <button
                                onClick={handleSwapTokens}
                                disabled={!buyToken}
                                className="bg-gray-50 dark:bg-[#0d111c] p-2 rounded-xl border-4 border-white dark:border-[#131a2a] hover:bg-gray-100 dark:hover:bg-[#293249] transition-colors disabled:opacity-50"
                            >
                                <FiArrowDown size={20} className="text-gray-500 dark:text-[#98a1c0]" />
                            </button>
                        </div>

                        {/* Buy Token Display */}
                        <div className="bg-gray-50 dark:bg-[#0d111c] rounded-2xl p-5 pt-6">
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-500 dark:text-[#98a1c0] text-sm font-medium">You receive</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={receiveAmount}
                                    readOnly
                                    className="w-full bg-transparent text-4xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#5d6785] outline-none"
                                />
                                {buyToken ? (
                                    <button
                                        onClick={() => openTokenSelector('buy')}
                                        className="flex items-center gap-2 bg-white dark:bg-[#293249] hover:bg-gray-100 dark:hover:bg-[#404a67] text-gray-900 dark:text-white px-4 py-2 rounded-full transition-colors shrink-0 shadow-sm"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                            {buyToken.symbol[0]}
                                        </div>
                                        <span className="font-semibold text-lg">{buyToken.symbol}</span>
                                        <FiArrowDown size={16} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => openTokenSelector('buy')}
                                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-blue-500/25"
                                    >
                                        Select token
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Limit Price Input */}
                    <div className="mt-4 bg-gray-50 dark:bg-[#0d111c] rounded-2xl p-5">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-500 dark:text-[#98a1c0] text-sm font-medium">Limit Price</span>
                            <span className="text-xs text-gray-400 dark:text-[#5d6785]">
                                {buyToken ? `${sellToken.symbol} per ${buyToken.symbol}` : 'Select token first'}
                            </span>
                        </div>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={limitPrice}
                            onChange={(e) => setLimitPrice(e.target.value)}
                            className="w-full bg-transparent text-3xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#5d6785] outline-none"
                        />
                    </div>

                    {/* Expiry Selection */}
                    <div className="mt-4">
                        <div className="text-gray-500 dark:text-[#98a1c0] text-sm font-medium mb-3">Expires in</div>
                        <div className="flex gap-2">
                            {['1h', '24h', '7d', '30d'].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setExpiry(time)}
                                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${expiry === time
                                            ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-gray-100 dark:bg-[#0d111c] text-gray-600 dark:text-[#98a1c0] hover:bg-gray-200 dark:hover:bg-[#293249]'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        disabled
                        className="w-full mt-6 py-4 bg-gray-300 dark:bg-[#293249] text-gray-500 dark:text-[#5d6785] font-bold text-lg rounded-2xl cursor-not-allowed"
                    >
                        Coming Soon
                    </motion.button>
                </motion.div>
            </main>

            <Footer />

            <TokenSelectorModal
                isOpen={isTokenSelectorOpen}
                onClose={() => setIsTokenSelectorOpen(false)}
                onSelect={handleTokenSelect}
            />

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                slippage={slippage}
                setSlippage={setSlippage}
                deadline={deadline}
                setDeadline={setDeadline}
            />
        </div>
    )
}
