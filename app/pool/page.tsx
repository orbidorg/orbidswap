import { Header } from '../../components/Header'

export default function Pool() {
    return (
        <div className="min-h-screen bg-[#0d111c] text-white font-sans selection:bg-[#4c82fb] selection:text-white">
            <Header />
            <main className="flex flex-col items-center justify-center p-4 mt-20">
                <div className="w-full max-w-2xl text-center">
                    <h1 className="text-4xl font-bold mb-4">Pools</h1>
                    <p className="text-[#98a1c0] text-lg mb-8">
                        Provide liquidity to earn trading fees.
                    </p>

                    <div className="bg-[#131a2a] rounded-3xl p-8 border border-[#293249]">
                        <div className="text-[#98a1c0]">
                            Your active liquidity positions will appear here.
                        </div>
                        <button className="mt-6 bg-[#4c82fb] hover:bg-[#3b66c9] text-white font-semibold px-6 py-3 rounded-2xl transition-colors">
                            + New Position
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
