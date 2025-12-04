import { Header } from '../../components/Header'

export default function Explore() {
    return (
        <div className="min-h-screen bg-[#0d111c] text-white font-sans selection:bg-[#4c82fb] selection:text-white">
            <Header />
            <main className="flex flex-col items-center justify-center p-4 mt-20">
                <div className="w-full max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Explore</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Top Tokens */}
                        <div className="bg-[#131a2a] rounded-3xl p-6 border border-[#293249]">
                            <h2 className="text-xl font-bold mb-4">Top Tokens</h2>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-2 hover:bg-[#293249]/50 rounded-xl cursor-pointer transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[#98a1c0] w-4">{i}</span>
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                                            <div>
                                                <div className="font-medium">Token Name</div>
                                                <div className="text-[#98a1c0] text-xs">TKN</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div>$123.45</div>
                                            <div className="text-green-500 text-xs">+1.2%</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Pools */}
                        <div className="bg-[#131a2a] rounded-3xl p-6 border border-[#293249]">
                            <h2 className="text-xl font-bold mb-4">Top Pools</h2>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-2 hover:bg-[#293249]/50 rounded-xl cursor-pointer transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[#98a1c0] w-4">{i}</span>
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#131a2a]"></div>
                                                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#131a2a]"></div>
                                            </div>
                                            <div>
                                                <div className="font-medium">ETH/USDC</div>
                                                <div className="text-[#98a1c0] text-xs">$1.2M TVL</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div>$45.2k</div>
                                            <div className="text-[#98a1c0] text-xs">24h Vol</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
