import { useQuery } from "@tanstack/react-query";

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  category: "crypto" | "stock";
  amount: number;
  currentPrice: number;
  changePercent: number;
  icon: string;
}

// Mock data for now - replace with real API calls
const MOCK_ASSETS: Asset[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    category: "crypto",
    amount: 0.5,
    currentPrice: 42500,
    changePercent: 5.2,
    icon: "₿",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    category: "crypto",
    amount: 5,
    currentPrice: 2300,
    changePercent: -2.1,
    icon: "Ξ",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    category: "crypto",
    amount: 25,
    currentPrice: 195,
    changePercent: 8.7,
    icon: "◎",
  },
  {
    id: "msft",
    name: "Microsoft",
    symbol: "MSFT",
    category: "stock",
    amount: 50,
    currentPrice: 450,
    changePercent: 3.4,
    icon: "Ⓜ",
  },
  {
    id: "aapl",
    name: "Apple",
    symbol: "AAPL",
    category: "stock",
    amount: 30,
    currentPrice: 230,
    changePercent: -1.5,
    icon: "A",
  },
  {
    id: "googl",
    name: "Google",
    symbol: "GOOGL",
    category: "stock",
    amount: 15,
    currentPrice: 180,
    changePercent: 2.8,
    icon: "G",
  },
];

async function fetchAssetPrices(): Promise<Asset[]> {
  // TODO: Replace with real API calls
  // Example using Alpha Vantage for stocks and crypto

  // For now, return mock data with a simulated delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_ASSETS;
}

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssetPrices,
    refetchInterval: 120000, // Refetch every 2 minutes
    staleTime: 60000, // Data is fresh for 60 seconds
    retry: 2, // Retry failed requests twice
  });
}
