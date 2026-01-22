import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';

interface AddStockFormProps {
  onAdd: (ticker: string, quantity: number, buyPrice: number) => Promise<void>;
  loading?: boolean;
}

export const AddStockForm = ({ onAdd, loading }: AddStockFormProps) => {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker && quantity && buyPrice) {
      await onAdd(ticker, parseFloat(quantity), parseFloat(buyPrice));
      setTicker('');
      setQuantity('');
      setBuyPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-xl p-5 animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Add Stock</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticker" className="text-muted-foreground text-sm">Ticker</Label>
          <Input
            id="ticker"
            placeholder="e.g. AAPL"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="bg-secondary border-border focus:border-primary"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-muted-foreground text-sm">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            placeholder="100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="bg-secondary border-border focus:border-primary font-mono"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyPrice" className="text-muted-foreground text-sm">Buy Price ($)</Label>
          <Input
            id="buyPrice"
            type="number"
            step="0.01"
            placeholder="150.00"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="bg-secondary border-border focus:border-primary font-mono"
            disabled={loading}
          />
        </div>
        <div className="flex items-end">
          <Button 
            type="submit" 
            className="w-full gradient-primary text-primary-foreground font-medium"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};
