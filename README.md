# <div align="center"><img src="public/logo.svg" alt="OrbidSwap Logo" width="120" /></div>

<div align="center">

# OrbidSwap
**The Native Liquidity Layer for World Chain**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![World Chain](https://img.shields.io/badge/World_Chain-Sepolia-7B3FE4)](https://worldcoin.org/)
[![World ID](https://img.shields.io/badge/World_ID-Integrated-00D632)](https://docs.world.org/world-id)

[Launch dApp](https://orbidswap.org) • [Documentation](https://docs.orbidswap.org) • [Discord](https://discord.gg/orbidswap)

</div>

---

## 🌍 Overview

**OrbidSwap** is the first decentralized exchange (DEX) natively designed for **World Chain**. We leverage World ID to bring **sybil-resistance** and **human-centric** features to DeFi.

Built on the robust Uniswap V2 architecture, OrbidSwap offers a familiar trading experience while introducing powerful new capabilities for verified humans.

### Why OrbidSwap?

- **⚡ Instant Swaps**: Low-latency trades with optimal routing.
- **🆔 World ID Integration**: Premium features like gasless swaps for verified humans.
- **🛡️ Bot-Resistant**: Fair launches and trading protected by Proof of Personhood.
- **💧 Sustainable Yields**: Earn 0.3% protocol fees by providing liquidity.

---

## ✨ Features

- **Token Swaps**: Trade WLD, ETH, USDC, and other World Chain assets.
- **Liquidity Pools**: Provide liquidity and track your positions.
- **Pool Explorer**: View APY, volume, and reserves in real-time.
- **Advanced Routing**: Smart routing for the best prices.
- **Theme Support**: Fully responsive Light and Dark modes.
- **Human Priority**: Verified users get priority blockspace (Coming Soon).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Blockchain**: Wagmi v2 + Viem
- **Contracts**: Uniswap V2 (Fork)
- **Verification**: World ID (IDKit)
- **Network**: World Chain (Sepolia Testnet / Mainnet)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- World App Wallet or MetaMask

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/orbidorg/orbidswap.git
   cd orbidswap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file with your WalletConnect Project ID:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ for the World Chain Ecosystem</sub>
</div>
