# Stocks Dashboard

A lightweight stocks dashboard built to practice real-time API integration and frontend architecture using modern web technologies. The project focuses on a simple, clean UI for displaying live stock price data.

---

## Features

- Fetches live stock prices using the **Yahoo Finance API**
- Displays current market data in a clean, minimal interface
- Supports tracking multiple stocks
- Fast development and hot reload using Vite
- Modular and maintainable codebase

---

## Tech Stack

- React  
- TypeScript  
- Vite  
- Tailwind CSS  
- shadcn/ui  
- Yahoo Finance API  

---

## Setup & Run

### Prerequisites

- Node.js **18+**
- npm

Verify installation:
```bash
node -v
npm -v
```

Installation

Install dependencies:
```bash
npm install
```

Environment Variables

Create a .env file in the project root:
```bash
VITE_YAHOO_FINANCE_API_KEY= api key
```

Run Development Server
```bash
npm run dev
```

Vite will start the local server (8080 port)

---

## API Usage (Yahoo Finance)

This project uses the Yahoo Finance API to retrieve real-time stock data.

## Data Retrieved

- Current stock price

- Open and close prices

- Price change

## Example Flow

- User selects or enters a stock symbol

- The frontend sends a request to the Yahoo Finance endpoint

- API response is parsed and displayed in the dashboard UI

## Notes

- API responses are handled asynchronously

- Errors such as invalid symbols or rate limits are handled in the UI

- This project uses real-time data and does not rely on mock responses
