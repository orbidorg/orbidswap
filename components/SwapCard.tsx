'use client'

import { useState } from 'react'
import { FiSettings, FiArrowDown, FiInfo } from 'react-icons/fi'
import { useAccount, useConnect, useBalance, useReadContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { formatUnits, parseUnits } from 'viem'
import { ERC20_ABI, ROUTER_ADDRESS, ROUTER_ABI, WETH_ADDRESS } from '../config/contracts'
import { TokenSelectorModal } from './TokenSelectorModal'
import { SettingsModal } from './SettingsModal'
import { useDebounce } from '../hooks/useDebounce'
import { useEffect } from 'react'

export function SwapCard() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()

    const [sellAmount, setSellAmount] = useState('')
    const [buyAmount, setBuyAmount] = useState('')

    // Modals State
    const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [selectorMode, setSelectorMode] = useState<'sell' | 'buy'>('sell')

    // Tokens State
    const [sellToken, setSellToken] = useState({ symbol: 'ETH', name: 'Ether', address: '0x0000000000000000000000000000000000000000' })
    const [buyToken, setBuyToken] = useState<null | { symbol: string, name: string, address: string }>(null)

    // ETH Balance
    const { data: ethBalance } = useBalance({ address })

    // Sell Token Balance (ERC20)
    const { data: sellTokenBalance } = useReadContract({
        address: sellToken.address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && sellToken.symbol !== 'ETH',
        }
    })

    // Buy Token Balance (ERC20)
    const { data: buyTokenBalance } = useReadContract({
        address: buyToken?.address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && !!buyToken && buyToken.symbol !== 'ETH',
        }
    })

    // Helper to get formatted balance
    const getBalance = (token: { symbol: string } | null, isEthBalance: any, tokenBalance: any) => {
        if (!token) return '0.00'
        if (token.symbol === 'ETH') {
            return isEthBalance ? formatUnits(isEthBalance.value, isEthBalance.decimals) : '0.00'
        }
        return tokenBalance ? formatUnits(tokenBalance, 18) : '0.00' // Assuming 18 decimals for now
    }

    // Quote Fetching
    const debouncedSellAmount = useDebounce(sellAmount, 500)

    const getPath = () => {
        if (!sellToken || !buyToken) return undefined

        const sellAddress = sellToken.symbol === 'ETH' ? WETH_ADDRESS : sellToken.address
        const buyAddress = buyToken.symbol === 'ETH' ? WETH_ADDRESS : buyToken.address

        if (sellAddress === buyAddress) return undefined

        // Simple routing: Direct or via WETH
        // If one is WETH, direct path.
        if (sellAddress === WETH_ADDRESS || buyAddress === WETH_ADDRESS) {
            return [sellAddress, buyAddress] as `0x${string}`[]
        }

        // Otherwise, route through WETH
        return [sellAddress, WETH_ADDRESS, buyAddress] as `0x${string}`[]
    }

    const path = getPath()
    const amountIn = debouncedSellAmount ? parseUnits(debouncedSellAmount, 18) : 0n // Assuming 18 decimals

    const { data: amountsOut } = useReadContract({
        address: ROUTER_ADDRESS as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: 'getAmountsOut',
        args: path && amountIn > 0n ? [amountIn, path] : undefined,
        query: {
            enabled: !!path && amountIn > 0n,
        }
    })

    // Update Buy Amount when quote changes
    useEffect(() => {
        if (amountsOut && amountsOut.length > 0) {
            const amount = amountsOut[amountsOut.length - 1]
            setBuyAmount(formatUnits(amount, 18)) // Assuming 18 decimals
        } else if (!debouncedSellAmount) {
            setBuyAmount('')
        }
    }, [amountsOut, debouncedSellAmount])

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

    return (
        <>
            <div className="w-full max-w-[480px] bg-[#0d111c] rounded-3xl p-2 border border-[#131a2a] shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 mb-2">
                    <div className="flex gap-4">
                        <button className="text-white font-medium text-lg">Swap</button>
                        <button className="text-[#98a1c0] font-medium text-lg hover:text-white transition-colors">Limit</button>
                    </div>
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="text-[#98a1c0] hover:text-white transition-colors"
                    >
                        <FiSettings size={20} />
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
                            <button
                                onClick={() => openTokenSelector('sell')}
                                className="flex items-center gap-2 bg-[#293249] hover:bg-[#404a67] text-white px-3 py-1.5 rounded-full transition-colors shrink-0"
                            >
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                                    {sellToken.symbol[0]}
                                </div>
                                <span className="font-semibold text-lg">{sellToken.symbol}</span>
                                <FiArrowDown size={16} />
                            </button>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-[#5d6785] text-sm">$0.00</span>
                            <span className="text-[#5d6785] text-sm">Balance: {parseFloat(getBalance(sellToken, ethBalance, sellTokenBalance)).toFixed(4)}</span>
                        </div>
                    </div>

                    {/* Arrow Separator */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="bg-[#131a2a] p-1.5 rounded-xl border-[4px] border-[#0d111c]">
                            <FiArrowDown size={20} className="text-[#98a1c0]" />
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
                            {buyToken ? (
                                <button
                                    onClick={() => openTokenSelector('buy')}
                                    className="flex items-center gap-2 bg-[#293249] hover:bg-[#404a67] text-white px-3 py-1.5 rounded-full transition-colors shrink-0"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                                        {buyToken.symbol[0]}
                                    </div>
                                    <span className="font-semibold text-lg">{buyToken.symbol}</span>
                                    <FiArrowDown size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => openTokenSelector('buy')}
                                    className="flex items-center gap-2 bg-[#4c82fb] hover:bg-[#3b66c9] text-white px-3 py-1.5 rounded-full transition-colors shrink-0 shadow-lg shadow-blue-500/20"
                                >
                                    <span className="font-semibold text-lg">Select token</span>
                                    <FiArrowDown size={16} />
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-[#5d6785] text-sm">$0.00</span>
                            <span className="text-[#5d6785] text-sm">Balance: {parseFloat(getBalance(buyToken, ethBalance, buyTokenBalance)).toFixed(4)}</span>
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
                            {!buyToken ? 'Select a token' : 'Enter an amount'}
                        </button>
                    )}
                </div>
            </div>

            <TokenSelectorModal
                isOpen={isTokenSelectorOpen}
                onClose={() => setIsTokenSelectorOpen(false)}
                onSelect={handleTokenSelect}
            />

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </>
    )
}
