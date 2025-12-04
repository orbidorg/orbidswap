import { Header } from '@/components/Header'
import { SwapCard } from '@/components/SwapCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d111c] text-white">
      <Header />
      <div className="container mx-auto px-4 flex flex-col items-center justify-center pt-20 pb-10">
        <SwapCard />
      </div>
    </main>
  )
}
