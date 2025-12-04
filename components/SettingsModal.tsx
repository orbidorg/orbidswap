'use client'

import { FiX, FiInfo } from 'react-icons/fi'
import { useState } from 'react'

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [slippage, setSlippage] = useState('auto')
    const [deadline, setDeadline] = useState('30')

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-[#0d111c] rounded-3xl border border-[#293249] shadow-2xl p-5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium text-lg">Settings</h3>
                    <button onClick={onClose} className="text-[#98a1c0] hover:text-white transition-colors">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Slippage */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#98a1c0] font-medium">Max. slippage</span>
                        <FiInfo size={14} className="text-[#5d6785]" />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSlippage('auto')}
                            className={`px-4 py-2 rounded-xl font-medium transition-colors ${slippage === 'auto'
                                ? 'bg-[#4c82fb] text-white'
                                : 'bg-[#131a2a] text-[#98a1c0] hover:bg-[#293249]'
                                }`}
                        >
                            Auto
                        </button>
                        <div className={`flex-1 flex items-center bg-[#131a2a] border ${slippage !== 'auto' ? 'border-[#4c82fb]' : 'border-[#293249]'} rounded-xl px-3`}>
                            <input
                                type="text"
                                placeholder="0.50"
                                value={slippage === 'auto' ? '' : slippage}
                                onChange={(e) => setSlippage(e.target.value)}
                                className="w-full bg-transparent text-white text-right outline-none font-medium"
                            />
                            <span className="text-[#98a1c0] ml-1">%</span>
                        </div>
                    </div>
                </div>

                {/* Deadline */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#98a1c0] font-medium">Transaction deadline</span>
                        <FiInfo size={14} className="text-[#5d6785]" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex items-center bg-[#131a2a] border border-[#293249] rounded-xl px-3 py-2 focus-within:border-[#4c82fb] transition-colors">
                            <input
                                type="text"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full bg-transparent text-white text-right outline-none font-medium"
                            />
                        </div>
                        <span className="text-[#98a1c0] font-medium">minutes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
