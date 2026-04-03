import { useFinance } from "@/context/useFinance";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categoryStyles = {
  Salary:
    "bg-emerald-500/10 text-slate-900 border-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300",
  Freelance:
    "bg-amber-500/10 text-slate-900 border-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300",
  Investments:
    "bg-cyan-500/10 text-slate-900 border-cyan-600/20 dark:bg-cyan-500/15 dark:text-cyan-300",
  Food: "bg-orange-500/10 text-slate-900 border-orange-600/20 dark:bg-orange-500/15 dark:text-orange-300",
  Transport:
    "bg-indigo-500/10 text-slate-900 border-indigo-600/20 dark:bg-indigo-500/15 dark:text-indigo-300",
  Shopping:
    "bg-violet-500/10 text-slate-900 border-violet-600/20 dark:bg-violet-500/15 dark:text-violet-300",
  Bills:
    "bg-rose-500/10 text-slate-900 border-rose-600/20 dark:bg-rose-500/15 dark:text-rose-300",
  Health:
    "bg-teal-500/10 text-slate-900 border-teal-600/20 dark:bg-teal-500/15 dark:text-teal-300",
  Education:
    "bg-sky-500/10 text-slate-900 border-sky-600/20 dark:bg-sky-500/15 dark:text-sky-300",
};

const RecentTransactions = () => {
  const { transactions } = useFinance();

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const renderMobileCard = (transaction) => (
    <div
      key={transaction.id}
      className="rounded-2xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {transaction.description}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(transaction.date)}
          </p>
        </div>

        <div
          className={`whitespace-nowrap text-right text-sm font-semibold ${transaction.type === "income" ? "text-slate-900 dark:text-green-400" : "text-slate-900 dark:text-rose-400"}`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryStyles[transaction.category] ?? "bg-slate-500/15 text-slate-700 border-slate-500/20 dark:text-slate-300"}`}
        >
          {transaction.category}
        </Badge>
        <Badge
          variant="outline"
          className={`rounded-full border px-3 py-1 text-xs font-medium ${transaction.type === "income" ? "border-green-600/20 bg-green-500/10 text-slate-900 dark:bg-green-500/15 dark:text-green-300" : "border-rose-600/20 bg-rose-500/10 text-slate-900 dark:bg-rose-500/15 dark:text-rose-300"}`}
        >
          {transaction.type}
        </Badge>
      </div>
    </div>
  );

  return (
    <Card className="glass-card overflow-hidden animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-5">
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Transactions
        </CardTitle>

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-xs text-muted-foreground hover:text-primary"
        >
          <Link to="/transactions">
            View all <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-3 p-4 md:p-0">
          <div className="hidden md:block md:overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="bg-muted/50 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className={`border-t border-border transition-colors hover:bg-muted/30 ${index === 0 ? "bg-transparent" : "bg-transparent"}`}
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">
                        {transaction.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryStyles[transaction.category] ?? "bg-slate-500/15 text-slate-700 border-slate-500/20 dark:text-slate-300"}`}
                      >
                        {transaction.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${transaction.type === "income" ? "border-green-600/20 bg-green-500/10 text-slate-900 dark:bg-green-500/15 dark:text-green-300" : "border-rose-600/20 bg-rose-500/10 text-slate-900 dark:bg-rose-500/15 dark:text-rose-300"}`}
                      >
                        {transaction.type}
                      </Badge>
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 py-4 text-right text-sm font-semibold ${transaction.type === "income" ? "text-slate-900 dark:text-green-400" : "text-slate-900 dark:text-rose-400"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {recentTransactions.map(renderMobileCard)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
