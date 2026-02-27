"use client";

import { useState } from "react";
import { useAssets } from "../hooks/useAssets";

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
    icon: "",
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

export function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "crypto" | "stock"
  >("all");

  const { data: allAssets = MOCK_ASSETS, isLoading, error } = useAssets();

  const filteredAssets =
    selectedCategory === "all"
      ? allAssets
      : allAssets.filter((a) => a.category === selectedCategory);

  const totalValue = allAssets.reduce(
    (sum: number, asset: Asset) => sum + asset.amount * asset.currentPrice,
    0,
  );
  const cryptoValue = allAssets
    .filter((a) => a.category === "crypto")
    .reduce(
      (sum: number, asset: Asset) => sum + asset.amount * asset.currentPrice,
      0,
    );
  const stockValue = allAssets
    .filter((a) => a.category === "stock")
    .reduce(
      (sum: number, asset: Asset) => sum + asset.amount * asset.currentPrice,
      0,
    );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8 flex items-center justify-center">
        <p className="text-slate-600">Loading portfolio data...</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8 flex items-center justify-center">
  //       <p className="text-red-600">
  //         Error loading portfolio data. Please try again later.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
          Portfolio Dashboard
        </h1>
        <p className="text-slate-600">
          Track your crypto and stock investments
        </p>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Value */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-slate-600 text-sm font-medium mb-2">
            Total Portfolio Value
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            ${totalValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </h2>
          <p className="text-green-600 text-sm mt-2">↑ 2.5% this month</p>
        </div>

        {/* Crypto Value */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-slate-600 text-sm font-medium mb-2">
            Crypto Holdings
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            ${cryptoValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {((cryptoValue / totalValue) * 100).toFixed(1)}% of portfolio
          </p>
        </div>

        {/* Stock Value */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-slate-600 text-sm font-medium mb-2">
            Stock Holdings
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            ${stockValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {((stockValue / totalValue) * 100).toFixed(1)}% of portfolio
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === "all"
              ? "bg-blue-500 text-white"
              : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
          }`}
        >
          All Assets
        </button>
        <button
          onClick={() => setSelectedCategory("crypto")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === "crypto"
              ? "bg-orange-500 text-white"
              : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
          }`}
        >
          Crypto
        </button>
        <button
          onClick={() => setSelectedCategory("stock")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === "stock"
              ? "bg-green-500 text-white"
              : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
          }`}
        >
          Stocks
        </button>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const assetValue = asset.amount * asset.currentPrice;
          const isPositive = asset.changePercent >= 0;

          return (
            <div
              key={asset.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-2xl font-bold text-slate-700">
                    {asset.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{asset.name}</h3>
                    <p className="text-sm text-slate-500">{asset.symbol}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    asset.category === "crypto"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {asset.category === "crypto" ? "Crypto" : "Stock"}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-end">
                  <span className="text-slate-600 text-sm">Price per unit</span>
                  <span className="font-semibold text-slate-900">
                    €{asset.currentPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-600 text-sm">Amount held</span>
                  <span className="font-semibold text-slate-900">
                    {asset.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 text-sm font-medium">
                    Total Value
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    €
                    {assetValue.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm font-medium">
                    24h Change
                  </span>
                  <span
                    className={`font-semibold text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
                  >
                    {isPositive ? "↑" : "↓"} {Math.abs(asset.changePercent)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
