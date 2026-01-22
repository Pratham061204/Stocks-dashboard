import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticker } = await req.json();
    
    if (!ticker) {
      return new Response(
        JSON.stringify({ error: 'Ticker is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use Yahoo Finance API via query1
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Yahoo Finance error:', text);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch stock data', ticker }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    const result = data?.chart?.result?.[0];
    if (!result) {
      return new Response(
        JSON.stringify({ error: 'Stock not found', ticker }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const meta = result.meta;
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.previousClose;
    const name = meta.shortName || meta.symbol;
    const currency = meta.currency;

    return new Response(
      JSON.stringify({
        ticker: ticker.toUpperCase(),
        name,
        currentPrice,
        previousClose,
        currency,
        change: currentPrice - previousClose,
        changePercent: ((currentPrice - previousClose) / previousClose) * 100
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
