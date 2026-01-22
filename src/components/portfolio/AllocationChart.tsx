import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AllocationData {
  ticker: string;
  name: string;
  value: number;
  percentage: number;
}

interface AllocationChartProps {
  data: AllocationData[];
}

const COLORS = [
  'hsl(217, 91%, 60%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(280, 65%, 60%)',
  'hsl(340, 75%, 55%)',
  'hsl(180, 65%, 50%)',
  'hsl(200, 80%, 55%)',
  'hsl(120, 60%, 45%)',
];

export const AllocationChart = ({ data }: AllocationChartProps) => {
  if (data.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 h-[350px] flex items-center justify-center animate-fade-in">
        <p className="text-muted-foreground">Add stocks to see allocation</p>
      </div>
    );
  }

  const chartData = data.map(d => ({
    name: d.ticker,
    value: d.value,
    percentage: d.percentage,
  }));

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="hsl(222, 47%, 6%)"
              strokeWidth={2}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover border border-border rounded-lg p-3 shadow-xl">
                      <p className="font-semibold">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${data.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm font-mono text-primary">{data.percentage.toFixed(1)}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
