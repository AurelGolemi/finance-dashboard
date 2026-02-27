import { useQuery } from "@tanstack/react-query";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  category: "crypto" | "stock";
  amount: number;
  currentPrice: number;
  changePercent: number;
  icon: string;
}

async function fetchStockPrice(symbol: string): Promise<{ price: number; change: number }> {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
  );
  const data = await response.json();

  if (data["Global Quote"]) {
    return {
      price: parseFloat(data["Global Quote"]["05. price"]),
      change: parseFloat(data["Global Quote"]["10. change percent"].replace("%", "")),
    };
  }
  throw new Error(`Failed to fetch ${symbol}`);
}

async function fetchCryptoPrice(symbol: string): Promise<{ price: number; change: number }> {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;
  const response = await fetch(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${apiKey}`
  );
  const data = await response.json();

  if (data["Realtime Currency Exchange Rate"]) {
    return {
      price: parseFloat(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]),
      change: parseFloat(data["Realtime Currency Exchange Rate"]["6. Bid Price"]),
    };
  }
  throw new Error(`Failed to fetch ${symbol}`);
}

async function fetchAssetPrices(): Promise<Asset[]> {
  const stockSymbols = ["MSFT", "AAPL", "GOOGL"];
  const cryptoSymbols = ["BTC", "ETH", "SOL"];

  // Fetch all prices in parallel
  const [stockPrices, cryptoPrices] = await Promise.all([
    Promise.all(stockSymbols.map(symbol => fetchStockPrice(symbol))),
    Promise.all(cryptoSymbols.map(symbol => fetchCryptoPrice(symbol))),
  ]);

  const assets: Asset[] = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      category: "crypto",
      amount: 0.5,
      currentPrice: cryptoPrices[0].price,
      changePercent: cryptoPrices[0].change,
      icon: "₿",
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      category: "crypto",
      amount: 5,
      currentPrice: cryptoPrices[1].price,
      changePercent: cryptoPrices[1].change,
      icon: "Ξ",
    },
    {
      id: "sol",
      name: "Solana",
      symbol: "SOL",
      category: "crypto",
      amount: 25,
      currentPrice: cryptoPrices[2].price,
      changePercent: cryptoPrices[2].change,
      icon: "◎",
    },
    {
      id: "msft",
      name: "Microsoft",
      symbol: "MSFT",
      category: "stock",
      amount: 50,
      currentPrice: stockPrices[0].price,
      changePercent: stockPrices[0].change,
      icon: "Ⓜ",
    },
    {
      id: "aapl",
      name: "Apple",
      symbol: "AAPL",
      category: "stock",
      amount: 30,
      currentPrice: stockPrices[1].price,
      changePercent: stockPrices[1].change,
      icon: "A",
    },
    {
      id: "googl",
      name: "Google",
      symbol: "GOOGL",
      category: "stock",
      amount: 15,
      currentPrice: stockPrices[2].price,
      changePercent: stockPrices[2].change,
      icon: "G",
    },
  ];

  return assets;
}

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssetPrices,
    refetchInterval: 120000, // Refetch every 2 minutes (Alpha Vantage has strict rate limits)
    staleTime: 60000, // Data is fresh for 60 seconds
    retry: 2, // Retry failed requests twice
  });
}