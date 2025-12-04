import { Header } from '@/components/Header'
import { SwapCard } from '@/components/SwapCard'

export default function SwapPage() {
    return (
        <div className="min-h-screen bg-[#0d111c] text-white font-sans selection:bg-[#4c82fb] selection:text-white">
            <Header />
            <main className="flex flex-col items-center justify-center p-4 mt-20">
                <SwapCard />
            </main>
        </div>
    )
}
