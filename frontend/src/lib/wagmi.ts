import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';

const creditcoinTestnet = {
    id: 102031,
    name: 'Creditcoin Testnet',
    nativeCurrency: { name: 'Testnet CTC', symbol: 'tCTC', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.cc3-testnet.creditcoin.network'] },
    },
    blockExplorers: {
        default: { name: 'Creditcoin Explorer', url: 'https://creditcoin.blockscout.com' },
    },
} as const;

export const config = getDefaultConfig({
    appName: 'BorrowIQ',
    projectId: '2d4e95a0e47f42191df91598d995d384',
    chains: [creditcoinTestnet, mainnet, sepolia, hardhat],
    ssr: true,
});
