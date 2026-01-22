import { Stock } from '@/types/portfolio';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StockTableProps {
  stocks: Stock[];
  onRemove: (id: string) => void;
}

export const StockTable = ({ stocks, onRemove }: StockTableProps) => {
  if (stocks.length === 0) {
    return (
      <div className="glass-card rounded-xl p-10 text-center animate-fade-in">
        <p className="text-muted-foreground">No stocks in your portfolio yet.</p>
        <p className="text-sm text-muted-foreground mt-1">Add your first stock above to get started!</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden animate-slide-up">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stock</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Qty</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Buy Price</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Current</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Value</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">P/L</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">P/L %</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => {
              const value = stock.currentPrice * stock.quantity;
              const cost = stock.buyPrice * stock.quantity;
              const pl = value - cost;
              const plPercent = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
              const isProfit = pl >= 0;

              return (
                <tr key={stock.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{stock.ticker}</p>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">{stock.quantity.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono">${stock.buyPrice.toFixed(2)}</td>
                  <td className="p-4 text-right font-mono">${stock.currentPrice.toFixed(2)}</td>
                  <td className="p-4 text-right font-mono font-medium">${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className={cn("p-4 text-right font-mono font-medium", isProfit ? "text-profit" : "text-loss")}>
                    <span className="flex items-center justify-end gap-1">
                      {isProfit ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      ${Math.abs(pl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className={cn("p-4 text-right font-mono font-medium", isProfit ? "text-profit" : "text-loss")}>
                    {isProfit ? '+' : ''}{plPercent.toFixed(2)}%
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(stock.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
