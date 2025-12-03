'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function Header() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const { disconnect } = useDisconnect()

    return (
        <header className="flex justify-between items-center p-4 border-b border-gray-800 bg-black text-white">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                OrbIdSwap
            </div>
            <div className="flex gap-4">
                {isConnected ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                        <button
                            onClick={() => disconnect()}
                            className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => connect({ connector: injected() })}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </header>
    )
}
