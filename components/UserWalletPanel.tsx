import { useAccount, useDisconnect, useBalance } from 'wagmi'
import { FiCopy, FiExternalLink, FiLogOut, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { formatUnits } from 'viem'

export function UserWalletPanel() {
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({ address })
    const [isOpen, setIsOpen] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    if (!isConnected || !address) return null

    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`

    return (
        <div className="relative" ref={panelRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-[#131a2a] hover:bg-[#293249] border border-[#293249] rounded-2xl px-3 py-2 transition-all"
            >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                <span className="text-white font-medium">{shortAddress}</span>
                <span className="text-[#98a1c0] hidden sm:block">
                    {balance ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} WLD` : '...'}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-72 bg-[#131a2a] border border-[#293249] rounded-3xl shadow-2xl p-4 z-50"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-medium">Connected</h3>
                            <button onClick={() => setIsOpen(false)} className="text-[#98a1c0] hover:text-white">
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-3" />
                            <div className="text-white font-bold text-xl">{shortAddress}</div>
                            <div className="text-[#98a1c0]">
                                {balance ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} WLD` : '...'}
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={() => navigator.clipboard.writeText(address)}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#293249] hover:bg-[#404a67] text-white py-2 rounded-xl transition-colors text-sm"
                            >
                                <FiCopy size={14} />
                                Copy
                            </button>
                            <a
                                href={`https://worldchain-sepolia.explorer.alchemy.com/address/${address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#293249] hover:bg-[#404a67] text-white py-2 rounded-xl transition-colors text-sm"
                            >
                                <FiExternalLink size={14} />
                                Explorer
                            </a>
                        </div>

                        <button
                            onClick={() => {
                                disconnect()
                                setIsOpen(false)
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-[#293249]/50 hover:bg-[#ff4d4d]/20 text-[#ff4d4d] py-3 rounded-xl transition-colors font-medium"
                        >
                            <FiLogOut size={16} />
                            Disconnect
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
