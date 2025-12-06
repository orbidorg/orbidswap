'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { FiHelpCircle, FiChevronDown, FiMessageSquare, FiExternalLink } from 'react-icons/fi'
import { useState } from 'react'

const faqs = [
    {
        question: "What is OrbidSwap?",
        answer: "OrbidSwap is a decentralized exchange (DEX) built on World Chain. It allows you to swap tokens instantly and earn yields by providing liquidity, all within a human-centric ecosystem."
    },
    {
        question: "How do I connect my wallet?",
        answer: "Click the 'Connect' button in the top right corner. You can connect using MetaMask, WalletConnect, or directly through World App if you are on mobile."
    },
    {
        question: "What fees does OrbidSwap charge?",
        answer: "OrbidSwap charges a standard 0.3% fee on all trades. 0.25% goes to liquidity providers, and 0.05% goes to the protocol treasury to fund development and World ID rewards."
    },
    {
        question: "Is OrbidSwap audited?",
        answer: "Security is our top priority. We use time-tested Uniswap V2 codebase. Official audit reports will be published in our documentation section soon."
    },
    {
        question: "Why do I need a World ID?",
        answer: "While anyone can trade, certain features like gas-free transactions and higher yield farming rewards are reserved for users with a verified World ID to prevent bot spam."
    }
]

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="min-h-screen bg-white dark:bg-[#0d111c] text-gray-900 dark:text-white font-sans bg-noise">
            <Header />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Help Center
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-[#98a1c0]">
                        Frequently asked questions and support.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#131a2a] border border-gray-200 dark:border-[#293249] rounded-2xl overflow-hidden transition-all duration-200"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <FiChevronDown
                                    className={`text-gray-400 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                                    size={20}
                                />
                            </button>
                            <div
                                className={`px-6 text-gray-500 dark:text-[#98a1c0] overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6' : 'max-h-0'}`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-blue-500/5 dark:bg-blue-500/10 rounded-3xl p-8 text-center border border-blue-500/20">
                    <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                    <p className="text-gray-600 dark:text-[#98a1c0] mb-8">
                        Join our community on Discord or reach out to us on Twitter.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="#" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                            <FiMessageSquare />
                            Discord
                        </a>
                        <a href="#" className="flex items-center gap-2 bg-white dark:bg-[#1ef] dark:bg-opacity-10 dark:text-white dark:hover:bg-opacity-20 border border-gray-200 dark:border-white/10 px-6 py-3 rounded-xl font-semibold transition-colors">
                            <FiExternalLink />
                            Twitter
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
