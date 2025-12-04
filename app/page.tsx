import { Header } from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md p-6 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Swap</h1>

          {/* Swap Interface Placeholder */}
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-xl">
              <label className="text-sm text-gray-400 mb-2 block">You Pay</label>
              <input
                type="number"
                placeholder="0.0"
                className="w-full bg-transparent text-2xl outline-none"
              />
            </div>

            <div className="flex justify-center">
              <div className="bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700">
                ↓
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl">
              <label className="text-sm text-gray-400 mb-2 block">You Receive</label>
              <input
                type="number"
                placeholder="0.0"
                className="w-full bg-transparent text-2xl outline-none"
                readOnly
              />
            </div>

            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition-colors mt-4">
              Swap
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
