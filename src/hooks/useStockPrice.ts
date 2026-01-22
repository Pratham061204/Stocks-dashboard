import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StockPriceData {
  ticker: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  currency: string;
  change: number;
  changePercent: number;
}

export const useStockPrice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async (ticker: string): Promise<StockPriceData | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('get-stock-price', {
        body: { ticker: ticker.toUpperCase() }
      });

      if (fnError) {
        setError(fnError.message);
        return null;
      }

      if (data.error) {
        setError(data.error);
        return null;
      }

      return data as StockPriceData;
    } catch (err) {
      setError('Failed to fetch price');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchPrice, loading, error };
};
