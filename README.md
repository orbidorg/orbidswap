# OrbIdSwap

DeFi Protocol on World Chain. A decentralized exchange interface built with Next.js, Wagmi, and Viem, featuring a modern, Uniswap-inspired UI.

## Features

- **Swap Interface**: Real-time token swaps with auto-routing (Direct or via WETH).
- **Wallet Integration**: Connect with World ID / World App (via WalletConnect) or standard wallets.
- **Real-time Data**: Live balance updates and price quotes from the OrbIdSwap Router.
- **Modern UI**: Dark mode aesthetic, smooth animations (Framer Motion), and responsive design.
- **Token Management**: Searchable token list with common tokens pre-configured.
- **Settings**: Customizable slippage tolerance and transaction deadlines.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Blockchain**: Wagmi v2, Viem, TanStack Query
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather)

## Project Structure

The project is a Next.js application located at the root.

- **`/app`**: Next.js App Router pages and layouts.
- **`/components`**: Reusable UI components (Header, SwapCard, Modals, etc.).
- **`/config`**: Wagmi configuration and contract constants.
- **`/contracts`**: Smart contract artifacts and ABIs.
- **`/hooks`**: Custom React hooks (e.g., `useDebounce`).

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Smart Contracts (World Chain Sepolia)

- **Factory**: `0x8b0e4101eFf62C6B7B209f536c91bd4Beef7523b`
- **Router**: `0x7931587aD009094FEf5cf462387C8909dC4C0625`
- **WETH**: `0xdBd74deF5339C659719Afd3f533412b5de4D3736`
