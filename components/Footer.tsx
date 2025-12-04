'use client'

import Link from 'next/link'
import { FiGithub, FiTwitter, FiBook, FiMessageCircle, FiGlobe } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa'

export function Footer() {
    return (
        <footer className="bg-[#0d111c] border-t border-[#293249] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand Column */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            O
                        </div>
                        <span className="text-xl font-bold text-white">OrbIdSwap</span>
                    </div>
                    <p className="text-[#98a1c0] text-sm leading-relaxed">
                        The most intuitive DEX on World Chain. Swap, earn, and build on the future of decentralized finance.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#98a1c0] hover:text-white transition-colors">
                            <FiTwitter size={20} />
                        </a>
                        <a href="https://github.com/orbidorg/orbidswap" target="_blank" rel="noopener noreferrer" className="text-[#98a1c0] hover:text-white transition-colors">
                            <FiGithub size={20} />
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-[#98a1c0] hover:text-white transition-colors">
                            <FaDiscord size={20} />
                        </a>
                    </div>
                </div>

                {/* Ecosystem */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Ecosystem</h3>
                    <ul className="flex flex-col gap-3 text-[#98a1c0] text-sm">
                        <li><Link href="/swap" className="hover:text-[#4c82fb] transition-colors">Swap</Link></li>
                        <li><Link href="/pool" className="hover:text-[#4c82fb] transition-colors">Pools</Link></li>
                        <li><Link href="/explore" className="hover:text-[#4c82fb] transition-colors">Explore</Link></li>
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors">Analytics</a></li>
                    </ul>
                </div>

                {/* Developers */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Developers</h3>
                    <ul className="flex flex-col gap-3 text-[#98a1c0] text-sm">
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors flex items-center gap-2">Documentation <FiBook size={14} /></a></li>
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors">Github</a></li>
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors">Audit</a></li>
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors">Bug Bounty</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Support</h3>
                    <ul className="flex flex-col gap-3 text-[#98a1c0] text-sm">
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-[#4c82fb] transition-colors flex items-center gap-2">Community <FiMessageCircle size={14} /></a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#293249] flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#5d6785] text-xs">© 2025 OrbIdSwap Protocol. All rights reserved.</p>
                <div className="flex items-center gap-2 text-[#5d6785] text-xs">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Operational on World Chain
                </div>
            </div>
        </footer>
    )
}
