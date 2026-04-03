import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useFinance } from "@/context/useFinance";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#2563eb",
  "#7c3aed",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#14b8a6",
  "#8b5cf6",
  "#0ea5e9",
];

const getFallbackColor = (index) => {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue} 70% 52%)`;
};

const SpendingByCategoryChart = () => {
  const { transactions } = useFinance();

  const chartData = useMemo(() => {
    const categoryMap = new Map();
    transactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        categoryMap.set(
          transaction.category,
          (categoryMap.get(transaction.category) || 0) + transaction.amount,
        );
      });

    return Array.from(categoryMap, ([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name))
      .map((item, index) => ({
        ...item,
        color: COLORS[index] ?? getFallbackColor(index),
      }));
  }, [transactions]);

  return (
    <Card className="glass-card animate-fade-in hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Spending by Category
        </CardTitle>
        <CardDescription className="text-xs">
          Where your money goes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="h-[240px] w-full lg:h-[260px] lg:w-[55%] lg:min-w-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {chartData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value) => [`₹${value.toLocaleString("en-IN")}`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="min-w-0 flex-1 space-y-2.5 lg:max-h-[260px] lg:overflow-y-auto lg:pr-1">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground truncate">
                  {item.name}
                </span>
                <span className="ml-auto font-medium">
                  ₹{item.value.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingByCategoryChart;
