import { useState, useCallback, useMemo } from 'react';
import { Stock, PortfolioSummary } from '@/types/portfolio';
import { supabase } from '@/integrations/supabase/client';

export const usePortfolio = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLivePrice = async (ticker: string): Promise<{ price: number; name: string } | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('get-stock-price', {
        body: { ticker: ticker.toUpperCase() }
      });

      if (error || data.error) {
        console.error('Price fetch error:', error || data.error);
        return null;
      }

      return {
        price: data.currentPrice,
        name: data.name
      };
    } catch (err) {
      console.error('Failed to fetch price:', err);
      return null;
    }
  };

  const addStock = useCallback(async (ticker: string, quantity: number, buyPrice: number) => {
    setLoading(true);
    const upperTicker = ticker.toUpperCase();
    
    // Fetch live price
    const liveData = await fetchLivePrice(upperTicker);
    
    const newStock: Stock = {
      id: `${upperTicker}-${Date.now()}`,
      ticker: upperTicker,
      name: liveData?.name || upperTicker,
      quantity,
      buyPrice,
      currentPrice: liveData?.price || buyPrice,
      currency: 'USD',
    };

    setStocks(prev => [...prev, newStock]);
    setLoading(false);
  }, []);

  const removeStock = useCallback((id: string) => {
    setStocks(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateStock = useCallback((id: string, updates: Partial<Stock>) => {
    setStocks(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const refreshPrices = useCallback(async () => {
    if (stocks.length === 0) return;
    setLoading(true);

    const updatedStocks = await Promise.all(
      stocks.map(async (stock) => {
        const liveData = await fetchLivePrice(stock.ticker);
        if (liveData) {
          return { ...stock, currentPrice: liveData.price, name: liveData.name };
        }
        return stock;
      })
    );

    setStocks(updatedStocks);
    setLoading(false);
  }, [stocks]);

  const summary: PortfolioSummary = useMemo(() => {
    const totalValue = stocks.reduce((acc, s) => acc + s.currentPrice * s.quantity, 0);
    const totalCost = stocks.reduce((acc, s) => acc + s.buyPrice * s.quantity, 0);
    const totalPL = totalValue - totalCost;
    const totalPLPercent = totalCost > 0 ? (totalPL / totalCost) * 100 : 0;

    return { totalValue, totalCost, totalPL, totalPLPercent };
  }, [stocks]);

  const allocation = useMemo(() => {
    const totalValue = stocks.reduce((acc, s) => acc + s.currentPrice * s.quantity, 0);
    return stocks.map(s => ({
      ticker: s.ticker,
      name: s.name,
      value: s.currentPrice * s.quantity,
      percentage: totalValue > 0 ? ((s.currentPrice * s.quantity) / totalValue) * 100 : 0,
    }));
  }, [stocks]);

  return {
    stocks,
    summary,
    allocation,
    addStock,
    removeStock,
    updateStock,
    refreshPrices,
    loading,
  };
};
