import { useFinance } from "@/context/FinanceContext";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RecentTransactions = () => {
  const { transactions } = useFinance();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="glass-card animate-fade-in hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground hover:text-primary">
          <Link to="/transactions">
            View all <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {recent.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{tx.description}</p>
              <p className="text-xs text-muted-foreground">{formatDate(tx.date)} · {tx.category}</p>
            </div>
            <div className="flex items-center gap-2 ml-3">
              <span className={`font-semibold text-sm ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
              </span>
              <Badge variant={tx.type === "income" ? "default" : "destructive"} className="text-[10px] px-1.5 py-0 shrink-0">
                {tx.type}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
