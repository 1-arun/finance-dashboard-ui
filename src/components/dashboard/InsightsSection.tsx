import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { formatCurrency } from "@/utils/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, PiggyBank, AlertTriangle } from "lucide-react";

const InsightsSection = () => {
  const { transactions, totalBalance } = useFinance();

  const insights = useMemo(() => {
    const catMap = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
    const highestCat = [...catMap.entries()].sort((a, b) => b[1] - a[1])[0];

    const marchExpenses = transactions
      .filter((t) => t.type === "expense" && t.date.startsWith("2026-03"))
      .reduce((s, t) => s + t.amount, 0);
    const febExpenses = transactions
      .filter((t) => t.type === "expense" && t.date.startsWith("2026-02"))
      .reduce((s, t) => s + t.amount, 0);
    const monthDiff = marchExpenses - febExpenses;

    return { highestCat, monthDiff, savings: totalBalance };
  }, [transactions, totalBalance]);

  const cards = [
    {
      title: "Highest Spending",
      value: insights.highestCat ? insights.highestCat[0] : "N/A",
      subtitle: insights.highestCat ? formatCurrency(insights.highestCat[1]) : "",
      icon: AlertTriangle,
      color: "text-warning bg-warning/10",
    },
    {
      title: "Monthly Change",
      value: `${insights.monthDiff >= 0 ? "+" : ""}${formatCurrency(Math.abs(insights.monthDiff))}`,
      subtitle: "Mar vs Feb expenses",
      icon: TrendingUp,
      color: insights.monthDiff <= 0 ? "text-success bg-success/10" : "text-destructive bg-destructive/10",
    },
    {
      title: "Total Savings",
      value: formatCurrency(insights.savings),
      subtitle: "Income − Expenses",
      icon: PiggyBank,
      color: "text-primary bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <Card
          key={card.title}
          className="glass-card animate-fade-in hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-2xl ${card.color}`}>
                <card.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{card.title}</p>
                <p className="font-bold text-lg mt-0.5">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{card.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InsightsSection;
