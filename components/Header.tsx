'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'
import { UserWalletPanel } from './UserWalletPanel'

export function Header() {
    const { isConnected } = useAccount()
    const { connect } = useConnect()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navLinks = [
        { name: 'Swap', href: '/swap' },
        { name: 'Explore', href: '/explore' },
        { name: 'Pool', href: '/pool' },
    ]

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0d111c] border-b border-[#293249]">
            {/* Left: Logo & Nav */}
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        O
                    </div>
                    <span className="text-xl font-bold text-white hidden sm:block">OrbIdSwap</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[#98a1c0] hover:text-white font-medium transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Center: Search (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#98a1c0] group-focus-within:text-white">
                        <FiSearch size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tokens and pools"
                        className="w-full bg-[#131a2a] border border-[#293249] rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-[#98a1c0] focus:outline-none focus:border-[#4c82fb] focus:ring-1 focus:ring-[#4c82fb] transition-all"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <span className="bg-[#293249] text-[#98a1c0] text-xs px-1.5 py-0.5 rounded">/</span>
                    </div>
                </div>
            </div>

            {/* Right: Wallet & Mobile Menu */}
            <div className="flex items-center gap-3">
                {/* Network Selector (Static for now) */}
                <div className="hidden sm:flex items-center gap-2 bg-[#131a2a] hover:bg-[#293249] px-3 py-2 rounded-xl cursor-pointer transition-colors">
                    <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                    <FiChevronDown size={16} className="text-[#98a1c0]" />
                </div>

                {isConnected ? (
                    <UserWalletPanel />
                ) : (
                    <button
                        onClick={() => connect({ connector: injected() })}
                        className="px-4 py-2 bg-[#4c82fb]/10 hover:bg-[#4c82fb]/20 text-[#4c82fb] font-semibold rounded-xl transition-colors"
                    >
                        Connect
                    </button>
                )}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-[#98a1c0] hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[#0d111c] border-b border-[#293249] p-4 md:hidden flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[#98a1c0] hover:text-white font-medium py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#98a1c0]">
                            <FiSearch size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search tokens"
                            className="w-full bg-[#131a2a] border border-[#293249] rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-[#98a1c0] focus:outline-none focus:border-[#4c82fb]"
                        />
                    </div>
                </div>
            )}
        </header>
    )
}
