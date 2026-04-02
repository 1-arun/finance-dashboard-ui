import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  return _jsxs(Card, {
    className: "glass-card overflow-hidden animate-fade-in",
    children: [
      _jsxs(CardHeader, {
        className:
          "flex flex-row items-center justify-between border-b border-border px-6 py-5",
        children: [
          _jsx(CardTitle, {
            className: "text-lg font-semibold text-foreground",
            children: "Recent Transactions",
          }),
          _jsx(Button, {
            variant: "ghost",
            size: "sm",
            asChild: true,
            className: "text-xs text-muted-foreground hover:text-primary",
            children: _jsxs(Link, {
              to: "/transactions",
              children: [
                "View all ",
                _jsx(ArrowRight, { className: "h-3 w-3 ml-1" }),
              ],
            }),
          }),
        ],
      }),
      _jsx(CardContent, {
        className: "p-0",
        children: _jsx("div", {
          className: "overflow-x-auto",
          children: _jsxs("table", {
            className: "w-full min-w-[720px] border-collapse",
            children: [
              _jsx("thead", {
                children: _jsxs("tr", {
                  className:
                    "bg-muted/50 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
                  children: [
                    _jsx("th", {
                      className: "px-6 py-4 font-medium",
                      children: "Date",
                    }),
                    _jsx("th", {
                      className: "px-6 py-4 font-medium",
                      children: "Description",
                    }),
                    _jsx("th", {
                      className: "px-6 py-4 font-medium",
                      children: "Category",
                    }),
                    _jsx("th", {
                      className: "px-6 py-4 font-medium",
                      children: "Type",
                    }),
                    _jsx("th", {
                      className: "px-6 py-4 font-medium text-right",
                      children: "Amount",
                    }),
                  ],
                }),
              }),
              _jsx("tbody", {
                children: recent.map((tx, index) =>
                  _jsxs(
                    "tr",
                    {
                      className: [
                        "border-t border-border transition-colors hover:bg-muted/30",
                        index === 0 ? "bg-transparent" : "bg-transparent",
                      ].join(" "),
                      children: [
                        _jsx("td", {
                          className:
                            "px-6 py-4 text-sm text-muted-foreground whitespace-nowrap",
                          children: formatDate(tx.date),
                        }),
                        _jsx("td", {
                          className: "px-6 py-4",
                          children: _jsx("div", {
                            className: "font-medium text-foreground",
                            children: tx.description,
                          }),
                        }),
                        _jsx("td", {
                          className: "px-6 py-4",
                          children: _jsx(Badge, {
                            variant: "outline",
                            className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryStyles[tx.category] ?? "bg-slate-500/15 text-slate-700 border-slate-500/20 dark:text-slate-300"}`,
                            children: tx.category,
                          }),
                        }),
                        _jsx("td", {
                          className: "px-6 py-4",
                          children: _jsx(Badge, {
                            variant: "outline",
                            className: `rounded-full border px-3 py-1 text-xs font-medium ${tx.type === "income" ? "border-green-600/20 bg-green-500/10 text-slate-900 dark:bg-green-500/15 dark:text-green-300" : "border-rose-600/20 bg-rose-500/10 text-slate-900 dark:bg-rose-500/15 dark:text-rose-300"}`,
                            children: tx.type,
                          }),
                        }),
                        _jsxs("td", {
                          className: `px-6 py-4 text-right text-sm font-semibold whitespace-nowrap ${tx.type === "income" ? "text-slate-900 dark:text-green-400" : "text-slate-900 dark:text-rose-400"}`,
                          children: [
                            tx.type === "income" ? "+" : "-",
                            formatCurrency(tx.amount),
                          ],
                        }),
                      ],
                    },
                    tx.id,
                  ),
                ),
              }),
            ],
          }),
        }),
      }),
    ],
  });
};
export default RecentTransactions;
