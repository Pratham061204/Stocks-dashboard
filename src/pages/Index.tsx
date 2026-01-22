import { usePortfolio } from '@/hooks/usePortfolio';
import { SummaryCard } from '@/components/portfolio/SummaryCard';
import { AddStockForm } from '@/components/portfolio/AddStockForm';
import { StockTable } from '@/components/portfolio/StockTable';
import { AllocationChart } from '@/components/portfolio/AllocationChart';
import { Wallet, TrendingUp, PieChart, DollarSign, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { stocks, summary, allocation, addStock, removeStock, refreshPrices, loading } = usePortfolio();

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPL = (amount: number) => {
    const formatted = formatCurrency(Math.abs(amount));
    return amount >= 0 ? `+${formatted}` : `-${formatted.slice(1)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <DollarSign className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">US Portfolio Tracker</h1>
                <p className="text-sm text-muted-foreground">Live prices from Yahoo Finance</p>
              </div>
            </div>
            {stocks.length > 0 && (
              <Button 
                variant="outline" 
                onClick={refreshPrices}
                disabled={loading}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh Prices
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Value"
            value={formatCurrency(summary.totalValue)}
            icon={Wallet}
            trend="neutral"
          />
          <SummaryCard
            title="Total Cost"
            value={formatCurrency(summary.totalCost)}
            icon={DollarSign}
            trend="neutral"
          />
          <SummaryCard
            title="Total P/L"
            value={formatPL(summary.totalPL)}
            subValue={`${summary.totalPLPercent >= 0 ? '+' : ''}${summary.totalPLPercent.toFixed(2)}%`}
            icon={TrendingUp}
            trend={summary.totalPL >= 0 ? 'up' : 'down'}
          />
          <SummaryCard
            title="Holdings"
            value={stocks.length.toString()}
            subValue={stocks.length === 1 ? 'stock' : 'stocks'}
            icon={PieChart}
            trend="neutral"
          />
        </div>

        {/* Add Stock Form */}
        <AddStockForm onAdd={addStock} loading={loading} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stock Table */}
          <div className="lg:col-span-2">
            <StockTable stocks={stocks} onRemove={removeStock} />
          </div>

          {/* Allocation Chart */}
          <div>
            <AllocationChart data={allocation} />
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground pt-4">
          Prices fetched live from Yahoo Finance
        </p>
      </main>
    </div>
  );
};

export default Index;
