export interface Stock {
  id: string;
  ticker: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  currency: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalPL: number;
  totalPLPercent: number;
}
