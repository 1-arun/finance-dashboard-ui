import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { balanceTrendData } from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BalanceTrendChart = () => {
  const [period, setPeriod] = useState("monthly");

  const chartData = useMemo(() => {
    if (period === "weekly") {
      return [
        { label: "W1", income: 4200, expenses: 1200 },
        { label: "W2", income: 5100, expenses: 1650 },
        { label: "W3", income: 4700, expenses: 1450 },
        { label: "W4", income: 5600, expenses: 1900 },
      ];
    }

    return balanceTrendData.map((item) => ({
      label: item.month,
      income: item.balance,
      expenses: Math.round(item.balance * 0.28),
    }));
  }, [period]);

  return (
    <Card className="glass-card animate-fade-in hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base font-semibold">
            Balance Trend
          </CardTitle>
          <CardDescription className="text-xs">
            Monthly income vs expenses
          </CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[110px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="24%">
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Legend
                verticalAlign="top"
                align="center"
                iconType="square"
                wrapperStyle={{ paddingBottom: 8, fontSize: 12 }}
              />
              <Tooltip
                shared={false}
                cursor={false}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="hsl(var(--chart-income))"
                radius={[8, 8, 0, 0]}
                maxBarSize={30}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="hsl(var(--chart-expense))"
                radius={[8, 8, 0, 0]}
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceTrendChart;
