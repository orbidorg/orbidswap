# 🌐 OrbIdSwap

**Human-First DeFi for World Chain** — The first native decentralized exchange built specifically for World Chain, leveraging World ID to create DeFi that prioritizes verified humans.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![World Chain](https://img.shields.io/badge/World_Chain-Sepolia-7B3FE4)](https://worldcoin.org/)
[![World ID](https://img.shields.io/badge/World_ID-Ready-00D632)](https://docs.world.org/world-id)

---

## 🎯 Why OrbIdSwap?

### The Problem
World Chain has **proof-of-personhood** at its core, but lacks essential DeFi infrastructure. Users can't:
- Trade tokens freely on-chain
- Provide liquidity and earn fees
- Access human-centric financial services

### Our Solution
OrbIdSwap brings **Uniswap-style AMM functionality** to World Chain, enhanced with unique human-first features:

| Feature | Description |
|---------|-------------|
| 🔐 **World ID Integration** | Verified humans unlock premium features |
| ⚡ **Human Priority Blockspace** | Faster execution for verified users |
| ⛽ **Gasless Swaps** | Free gas for Orb-verified humans |
| 🤖 **Bot-Resistant** | Proof-of-personhood reduces front-running |

---

## ✨ Features

- **🔄 Token Swaps** — Instant swaps with auto-routing (direct or via WETH)
- **💧 Liquidity Pools** — Add/remove liquidity to earn 0.3% trading fees
- **🔍 Pool Explorer** — Browse pools with TVL, reserves, and exchange rates
- **👛 Smart Wallet UI** — Unique identicons, USD balance, copy animation
- **🌙 Dark/Light Mode** — Theme-aware design with smooth transitions
- **📊 Live Analytics** — Real-time TVL, gas prices, and pool metrics

---

## 🔗 World Ecosystem Integration

OrbIdSwap is designed to leverage World Chain's unique capabilities:

```
┌─────────────────────────────────────────────────────────────┐
│                    World Chain Integration                   │
├─────────────────────────────────────────────────────────────┤
│  ✅ World Chain Native    │ All contracts on World Chain   │
│  ✅ World App Wallet      │ WalletConnect + Injected       │
│  ✅ WLD Token             │ Native trading pair            │
│  🔜 World ID v2           │ Premium features for humans    │
│  🔜 Priority Blockspace   │ Faster execution               │
│  🔜 Gas Allowance         │ Gasless swaps                  │
└─────────────────────────────────────────────────────────────┘
```

### World ID Integration (Phase 2)

```
Verification Flow:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  World App  │ ──▶ │  World ID   │ ──▶ │  Premium    │
│    User     │     │   Verify    │     │  Features   │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    │                          │                          │
             ┌──────▼──────┐           ┌───────▼──────┐          ┌────────▼───────┐
             │  Reduced    │           │   Priority   │          │    Gasless     │
             │    Fees     │           │   Execution  │          │     Swaps      │
             └─────────────┘           └──────────────┘          └────────────────┘
```

---

## 🏗️ Technical Architecture

### Smart Contracts (World Chain Sepolia)

| Contract | Address |
|----------|---------|
| **Factory** | `0x8b0e4101eFf62C6B7B209f536c91bd4Beef7523b` |
| **Router** | `0x7931587aD009094FEf5cf462387C8909dC4C0625` |
| **WETH** | `0xdBd74deF5339C659719Afd3f533412b5de4D3736` |

### Frontend Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Blockchain | Wagmi v2, Viem, TanStack Query |
| Animations | Framer Motion |
| Analytics | Vercel Analytics + Speed Insights |

### Project Structure

```
orbidswap/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page with stats
│   ├── swap/page.tsx      # Token swap interface
│   ├── pool/page.tsx      # Liquidity management
│   ├── explore/page.tsx   # Pool explorer
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── SwapCard.tsx       # Main swap interface
│   ├── Header.tsx         # Navigation with wallet
│   ├── UserWalletPanel.tsx
│   ├── Identicon.tsx      # Unique wallet avatars
│   └── ...
├── config/
│   ├── wagmi.ts           # Chain configuration
│   └── contracts.ts       # ABIs & addresses
└── hooks/
    └── useDebounce.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- World App wallet (recommended) or MetaMask

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

---

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Smart contract deployment
- [x] Swap interface
- [x] Liquidity management
- [x] Pool explorer
- [x] Wallet identicons
- [x] Theme support

### Phase 2: World ID Integration 🔜
- [ ] IDKit v2 integration
- [ ] Verified human premium features
- [ ] Priority blockspace for humans
- [ ] Gasless swaps

### Phase 3: Growth
- [ ] Mainnet deployment
- [ ] Security audit
- [ ] Liquidity incentive program
- [ ] Price charts and analytics

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
- **World ID Docs**: [docs.world.org/world-id](https://docs.world.org/world-id)

---

Built with ❤️ in Colombia 🇨🇴 for the World Chain ecosystem
