import { useFinance } from "@/context/useFinance";
import { formatCurrency } from "@/utils/formatters";
import { Card, CardContent } from "@/components/ui/card";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const SummaryCards = () => {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    {
      title: "Total Balance",
      value: totalBalance,
      icon: IndianRupee,
      colorClass: "text-primary bg-primary/10",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      colorClass: "text-success bg-success/10",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      colorClass: "text-destructive bg-destructive/10",
      trend: "-3.1%",
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <Card
          key={card.title}
          className="glass-card animate-fade-in hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(card.value)}
                </p>
                <div
                  className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${card.trendUp ? "text-success" : "text-destructive"}`}
                >
                  {card.trendUp ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{card.trend} vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-2xl ${card.colorClass}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
