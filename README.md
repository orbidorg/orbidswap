# 🌐 OrbIdSwap

**The Native Liquidity Layer for World Chain** — A decentralized exchange (DEX) protocol built specifically for the World Chain ecosystem, enabling verified humans to swap tokens, provide liquidity, and participate in DeFi with zero compromise.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![World Chain](https://img.shields.io/badge/World_Chain-Sepolia-7B3FE4)](https://worldcoin.org/)

---

## 🎯 Problem & Solution

### The Problem
World Chain lacks a native, user-friendly DEX protocol. Users with verified World IDs have limited options to:
- Swap tokens freely within the ecosystem
- Provide liquidity and earn fees
- Participate in decentralized finance

### The Solution
**OrbIdSwap** brings Uniswap-style AMM functionality to World Chain:
- **Permissionless token swaps** with automatic routing
- **Liquidity pools** that anyone can create or join
- **Human-first design** optimized for World App integration
- **Transparent pricing** via constant product AMM (x * y = k)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔄 **Token Swaps** | Instant swaps with auto-routing (direct or via WETH) |
| 💧 **Liquidity Pools** | Add/remove liquidity to earn 0.3% trading fees |
| 🔍 **Pool Explorer** | Browse all pools with TVL, reserves, and exchange rates |
| 👛 **Smart Wallet UI** | Unique identicons, USD balance, copy animation |
| 🌙 **Dark/Light Mode** | Theme-aware design with smooth transitions |
| 📊 **Live Analytics** | Real-time TVL, gas prices, and pool metrics |

---

## 🏗️ Technical Architecture

### Smart Contracts (Uniswap V2 Fork)

```
┌─────────────────────────────────────────────────────────────┐
│                    World Chain Sepolia                       │
├─────────────────────────────────────────────────────────────┤
│  Factory: 0x8b0e4101eFf62C6B7B209f536c91bd4Beef7523b        │
│  Router:  0x7931587aD009094FEf5cf462387C8909dC4C0625        │
│  WETH:    0xdBd74deF5339C659719Afd3f533412b5de4D3736        │
└─────────────────────────────────────────────────────────────┘
```

**Contract Functions:**
- `Factory.createPair(tokenA, tokenB)` — Deploy new liquidity pools
- `Router.swapExactTokensForTokens(...)` — Execute token swaps
- `Router.addLiquidity(...)` — Provide liquidity to pools
- `Router.removeLiquidity(...)` — Withdraw liquidity positions

### Frontend Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Blockchain | Wagmi v2, Viem, TanStack Query |
| Animations | Framer Motion |
| Analytics | Vercel Analytics + Speed Insights |
| Icons | React Icons (Feather) |

### Project Structure

```
orbidswap/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page with stats
│   ├── swap/page.tsx      # Token swap interface
│   ├── pool/page.tsx      # Liquidity management
│   ├── explore/page.tsx   # Pool explorer with analytics
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── SwapCard.tsx       # Main swap interface
│   ├── Header.tsx         # Navigation with wallet
│   ├── UserWalletPanel.tsx # Wallet dropdown with identicon
│   ├── Identicon.tsx      # Unique wallet avatars
│   ├── Spotlight.tsx      # Mouse-aware effects
│   └── ...
├── config/
│   ├── wagmi.ts           # Chain & wallet configuration
│   └── contracts.ts       # ABIs & addresses
└── hooks/
    └── useDebounce.ts     # Input debouncing
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or World App wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/orbidorg/orbidswap.git
cd orbidswap

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

No environment variables required for basic operation. The app connects directly to World Chain Sepolia RPC.

---

## 🔧 Configuration

### Adding New Tokens

Edit `components/TokenSelectorModal.tsx` to add tokens:

```typescript
const COMMON_TOKENS = [
    { symbol: 'WLD', name: 'Worldcoin', address: WETH_ADDRESS },
    { symbol: 'USDC', name: 'USD Coin', address: '0x...' },
    // Add more tokens here
]
```

### Connecting to Mainnet

Update `config/wagmi.ts`:

```typescript
import { worldchain } from 'wagmi/chains' // Mainnet

export const config = createConfig({
    chains: [worldchain],
    // ...
})
```

---

## 📈 Roadmap

- [x] Token swap interface
- [x] Liquidity pool management
- [x] Pool explorer with analytics
- [x] Wallet identicons
- [x] Theme support (dark/light)
- [ ] World ID verification integration
- [ ] Price charts and historical data
- [ ] Limit orders
- [ ] Multi-hop routing optimization
- [ ] Mobile-optimized experience

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🔗 Links

- **Live Demo**: [orbidswap.vercel.app](https://orbidswap.vercel.app)
- **GitHub**: [github.com/orbidorg/orbidswap](https://github.com/orbidorg/orbidswap)
- **World Chain Explorer**: [worldchain-sepolia.explorer.alchemy.com](https://worldchain-sepolia.explorer.alchemy.com)

---

Built with ❤️ for the World Chain ecosystem
