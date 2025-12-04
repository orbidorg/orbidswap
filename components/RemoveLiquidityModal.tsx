'use client'

import { useState, useEffect } from 'react'
import { FiX, FiArrowDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { toast } from 'react-hot-toast'
import { ERC20_ABI, ROUTER_ADDRESS, ROUTER_ABI, PAIR_ABI } from '../config/contracts'

interface RemoveLiquidityModalProps {
    isOpen: boolean
    onClose: () => void
    pairAddress: string
    tokenA: { symbol: string, address: string }
    tokenB: { symbol: string, address: string }
}

export function RemoveLiquidityModal({ isOpen, onClose, pairAddress, tokenA, tokenB }: RemoveLiquidityModalProps) {
    const { address } = useAccount()
    const [percentage, setPercentage] = useState(50)

    // Get LP Balance
    const { data: lpBalance } = useReadContract({
        address: pairAddress as `0x${string}`,
        abi: PAIR_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: { enabled: !!address && !!pairAddress }
    })

    // Get Allowance
    const { data: allowance } = useReadContract({
        address: pairAddress as `0x${string}`,
        abi: PAIR_ABI,
        functionName: 'allowance',
        args: address ? [address, ROUTER_ADDRESS as `0x${string}`] : undefined,
        query: { enabled: !!address && !!pairAddress }
    })

    const { writeContract, data: hash, isPending } = useWriteContract({
        mutation: {
            onSuccess: () => toast.success('Transaction submitted!'),
            onError: (error) => toast.error(`Failed: ${error.message.slice(0, 50)}...`)
        }
    })

    const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    useEffect(() => {
        if (isConfirmed) {
            toast.success('Liquidity removed successfully!')
            onClose()
        }
    }, [isConfirmed, onClose])

    const handleApprove = () => {
        if (!lpBalance) return
        writeContract({
            address: pairAddress as `0x${string}`,
            abi: PAIR_ABI,
            functionName: 'approve',
            args: [ROUTER_ADDRESS as `0x${string}`, lpBalance],
        })
    }

    const handleRemoveLiquidity = () => {
        if (!lpBalance || !address) return

        const amountToRemove = (lpBalance as bigint * BigInt(percentage)) / 100n
        const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20)

        if (tokenA.symbol === 'ETH' || tokenB.symbol === 'ETH') {
            const tokenAddress = tokenA.symbol === 'ETH' ? tokenB.address : tokenA.address
            writeContract({
                address: ROUTER_ADDRESS as `0x${string}`,
                abi: ROUTER_ABI,
                functionName: 'removeLiquidityETH',
                args: [
                    tokenAddress as `0x${string}`,
                    amountToRemove,
                    0n, // Min Token
                    0n, // Min ETH
                    address,
                    deadline
                ],
            })
        } else {
            writeContract({
                address: ROUTER_ADDRESS as `0x${string}`,
                abi: ROUTER_ABI,
                functionName: 'removeLiquidity',
                args: [
                    tokenA.address as `0x${string}`,
                    tokenB.address as `0x${string}`,
                    amountToRemove,
                    0n, // Min A
                    0n, // Min B
                    address,
                    deadline
                ],
            })
        }
    }

    const isApproved = allowance && lpBalance && (allowance as bigint) >= ((lpBalance as bigint * BigInt(percentage)) / 100n)

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md bg-[#131a2a] rounded-3xl border border-[#293249] overflow-hidden shadow-2xl"
                    >
                        <div className="p-5 border-b border-[#293249] flex justify-between items-center">
                            <h3 className="text-white font-medium text-lg">Remove Liquidity</h3>
                            <button onClick={onClose} className="text-[#98a1c0] hover:text-white">
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-5 flex flex-col gap-6">
                            <div className="text-white text-3xl font-medium">{percentage}%</div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={percentage}
                                onChange={(e) => setPercentage(parseInt(e.target.value))}
                                className="w-full h-2 bg-[#293249] rounded-lg appearance-none cursor-pointer accent-[#4c82fb]"
                            />
                            <div className="flex justify-between gap-2">
                                {[25, 50, 75, 100].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPercentage(p)}
                                        className="bg-[#131a2a] border border-[#293249] hover:border-[#4c82fb] text-[#98a1c0] hover:text-white py-1 px-3 rounded-xl text-sm transition-colors"
                                    >
                                        {p}%
                                    </button>
                                ))}
                            </div>

                            <div className="bg-[#0d111c] p-4 rounded-2xl border border-[#293249]">
                                <div className="flex justify-between mb-2">
                                    <span className="text-[#98a1c0] text-sm">You receive</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-white text-xl font-medium">0.00</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                                        <span className="text-white">{tokenA.symbol}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-white text-xl font-medium">0.00</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-purple-500"></div>
                                        <span className="text-white">{tokenB.symbol}</span>
                                    </div>
                                </div>
                            </div>

                            {!isApproved ? (
                                <button
                                    onClick={handleApprove}
                                    disabled={isPending}
                                    className="w-full bg-[#4c82fb] hover:bg-[#3b66c9] text-white font-semibold py-4 rounded-2xl transition-colors disabled:opacity-50"
                                >
                                    {isPending ? 'Approving...' : 'Approve'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleRemoveLiquidity}
                                    disabled={isPending}
                                    className="w-full bg-[#4c82fb] hover:bg-[#3b66c9] text-white font-semibold py-4 rounded-2xl transition-colors disabled:opacity-50"
                                >
                                    {isPending ? 'Removing...' : 'Remove'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
