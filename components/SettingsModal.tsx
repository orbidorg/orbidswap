import { FiX, FiInfo } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-sm bg-[#131a2a] rounded-3xl border border-[#293249] overflow-hidden shadow-2xl"
                    >
                        <div className="p-5 border-b border-[#293249] flex justify-between items-center">
                            <h3 className="text-white font-medium text-lg">Settings</h3>
                            <button onClick={onClose} className="text-[#98a1c0] hover:text-white transition-colors">
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-5 flex flex-col gap-6">
                            {/* Slippage */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[#98a1c0] font-medium text-sm">Max. slippage</span>
                                    <FiInfo size={14} className="text-[#5d6785]" />
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-[#4c82fb] text-white font-medium py-2 rounded-xl text-sm">Auto</button>
                                    <button className="flex-1 bg-[#0d111c] border border-[#293249] text-[#98a1c0] hover:text-white font-medium py-2 rounded-xl text-sm transition-colors">0.5%</button>
                                    <div className="flex-[1.5] relative">
                                        <input
                                            type="text"
                                            placeholder="0.5"
                                            className="w-full h-full bg-[#0d111c] border border-[#293249] rounded-xl px-3 text-right text-white outline-none focus:border-[#4c82fb] transition-colors"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98a1c0] text-sm">%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Deadline */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[#98a1c0] font-medium text-sm">Transaction deadline</span>
                                    <FiInfo size={14} className="text-[#5d6785]" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-24 relative">
                                        <input
                                            type="text"
                                            placeholder="20"
                                            className="w-full bg-[#0d111c] border border-[#293249] rounded-xl py-2 px-3 text-right text-white outline-none focus:border-[#4c82fb] transition-colors"
                                        />
                                    </div>
                                    <span className="text-[#98a1c0] text-sm">minutes</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
