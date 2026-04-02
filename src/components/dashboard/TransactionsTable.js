import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useFinance } from "@/context/useFinance";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ArrowUpDown,
  Plus,
  Pencil,
  Trash2,
  FileDown,
  Inbox,
  RotateCcw,
  Bike,
  UtensilsCrossed,
  ShoppingBag,
  Flame,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  CircleDollarSign,
  Theater,
  Laptop,
} from "lucide-react";
import TransactionForm from "./TransactionForm";
import { CATEGORIES } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
const categoryList = [
  "all",
  ...CATEGORIES.income,
  ...CATEGORIES.expense.filter(
    (category) => !CATEGORIES.income.includes(category),
  ),
];
const categoryIconMap = {
  Salary: BriefcaseBusiness,
  Freelance: Laptop,
  Investments: CircleDollarSign,
  "Other Income": CircleDollarSign,
  Food: UtensilsCrossed,
  Transport: Bike,
  Shopping: ShoppingBag,
  Entertainment: Theater,
  Bills: Flame,
  Health: HeartPulse,
  Education: GraduationCap,
};
const categoryChipStyles = {
  Salary:
    "bg-emerald-500/10 text-slate-900 border-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300",
  Freelance:
    "bg-amber-500/10 text-slate-900 border-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300",
  Investments:
    "bg-cyan-500/10 text-slate-900 border-cyan-600/20 dark:bg-cyan-500/15 dark:text-cyan-300",
  "Other Income":
    "bg-cyan-500/10 text-slate-900 border-cyan-600/20 dark:bg-cyan-500/15 dark:text-cyan-300",
  Food: "bg-orange-500/10 text-slate-900 border-orange-600/20 dark:bg-orange-500/15 dark:text-orange-300",
  Transport:
    "bg-indigo-500/10 text-slate-900 border-indigo-600/20 dark:bg-indigo-500/15 dark:text-indigo-300",
  Shopping:
    "bg-violet-500/10 text-slate-900 border-violet-600/20 dark:bg-violet-500/15 dark:text-violet-300",
  Entertainment:
    "bg-fuchsia-500/10 text-slate-900 border-fuchsia-600/20 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  Bills:
    "bg-rose-500/10 text-slate-900 border-rose-600/20 dark:bg-rose-500/15 dark:text-rose-300",
  Health:
    "bg-teal-500/10 text-slate-900 border-teal-600/20 dark:bg-teal-500/15 dark:text-teal-300",
  Education:
    "bg-sky-500/10 text-slate-900 border-sky-600/20 dark:bg-sky-500/15 dark:text-sky-300",
};
const TransactionsTable = () => {
  const {
    filteredTransactions,
    filters,
    setFilters,
    role,
    apiLoading,
    apiError,
    clearApiError,
    deleteTransaction,
  } = useFinance();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deletingId, setDeletingId] = useState(null);
  const visibleTransactions = filteredTransactions.filter(
    (transaction) =>
      selectedCategory === "all" || transaction.category === selectedCategory,
  );
  const toggleSort = () => {
    setFilters({ sortBy: filters.sortBy === "date" ? "amount" : "date" });
  };
  const toggleOrder = () => {
    setFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" });
  };
  const resetFilters = () => {
    setFilters({ search: "", type: "all", sortBy: "date", sortOrder: "desc" });
    setSelectedCategory("all");
  };
  const exportCSV = () => {
    const headers = ["Date,Description,Amount,Category,Type"];
    const rows = visibleTransactions.map(
      (t) => `${t.date},${t.description},${t.amount},${t.category},${t.type}`,
    );
    const blob = new Blob([headers.concat(rows).join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteTransaction(id);
      toast({ title: "Transaction deleted" });
    } catch (error) {
      toast({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };
  return _jsxs(Card, {
    className: "glass-card overflow-hidden animate-fade-in",
    children: [
      _jsx(CardHeader, {
        className: "border-b border-border px-6 py-5",
        children: _jsxs("div", {
          className: "flex flex-col gap-4",
          children: [
            apiError &&
              _jsxs("div", {
                className:
                  "flex items-center justify-between gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-700 dark:text-rose-300",
                children: [
                  _jsx("span", { children: apiError }),
                  _jsx(Button, {
                    variant: "ghost",
                    size: "sm",
                    className: "h-6 px-2 text-[11px]",
                    onClick: clearApiError,
                    children: "Dismiss",
                  }),
                ],
              }),
            _jsxs("div", {
              className:
                "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
              children: [
                _jsxs("div", {
                  children: [
                    _jsx(CardTitle, {
                      className: "text-lg font-semibold text-foreground",
                      children: "All Transactions",
                    }),
                    _jsx("p", {
                      className: "mt-1 text-sm text-muted-foreground",
                      children: "Manage and review all your transactions.",
                    }),
                  ],
                }),
                _jsxs("div", {
                  className: "flex items-center gap-2 flex-wrap",
                  children: [
                    role === "admin" &&
                      _jsxs(Button, {
                        size: "sm",
                        onClick: () => {
                          setEditingTx(null);
                          setShowForm(true);
                        },
                        disabled: apiLoading,
                        className:
                          "border border-border bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform",
                        children: [
                          _jsx(Plus, { className: "h-4 w-4 mr-1" }),
                          " Add",
                        ],
                      }),
                    _jsxs(Button, {
                      size: "sm",
                      variant: "outline",
                      onClick: exportCSV,
                      disabled: apiLoading,
                      className:
                        "border-border bg-background text-foreground hover:bg-muted hover:text-foreground hover:scale-105 transition-transform",
                      children: [
                        _jsx(FileDown, { className: "h-4 w-4 mr-1" }),
                        " Export",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            _jsxs("div", {
              className: "flex flex-col gap-2 lg:flex-row lg:items-center",
              children: [
                _jsxs("div", {
                  className: "relative flex-1",
                  children: [
                    _jsx(Search, {
                      className:
                        "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                    }),
                    _jsx(Input, {
                      placeholder: "Search transactions...",
                      className:
                        "h-10 border-border bg-background pl-9 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring",
                      value: filters.search,
                      onChange: (e) => setFilters({ search: e.target.value }),
                      disabled: apiLoading,
                    }),
                  ],
                }),
                _jsxs(Select, {
                  value: filters.type,
                  onValueChange: (v) => setFilters({ type: v }),
                  disabled: apiLoading,
                  children: [
                    _jsx(SelectTrigger, {
                      className:
                        "h-10 w-full border-border bg-background text-foreground lg:w-[140px]",
                      children: _jsx(SelectValue, { placeholder: "All types" }),
                    }),
                    _jsxs(SelectContent, {
                      children: [
                        _jsx(SelectItem, {
                          value: "all",
                          children: "All Types",
                        }),
                        _jsx(SelectItem, {
                          value: "income",
                          children: "Income",
                        }),
                        _jsx(SelectItem, {
                          value: "expense",
                          children: "Expense",
                        }),
                      ],
                    }),
                  ],
                }),
                _jsxs(Select, {
                  value: selectedCategory,
                  onValueChange: setSelectedCategory,
                  disabled: apiLoading,
                  children: [
                    _jsx(SelectTrigger, {
                      className:
                        "h-10 w-full border-border bg-background text-foreground lg:w-[180px]",
                      children: _jsx(SelectValue, {
                        placeholder: "All categories",
                      }),
                    }),
                    _jsxs(SelectContent, {
                      children: [
                        _jsx(SelectItem, {
                          value: "all",
                          children: "All Categories",
                        }),
                        categoryList
                          .filter((category) => category !== "all")
                          .map((category) =>
                            _jsx(
                              SelectItem,
                              { value: category, children: category },
                              category,
                            ),
                          ),
                      ],
                    }),
                  ],
                }),
                _jsx(Button, {
                  variant: "outline",
                  size: "icon",
                  onClick: toggleSort,
                  title: `Sort by ${filters.sortBy === "date" ? "amount" : "date"}`,
                  disabled: apiLoading,
                  className:
                    "h-10 w-10 border-border bg-background text-foreground hover:bg-muted hover:text-foreground",
                  children: _jsx(ArrowUpDown, { className: "h-4 w-4" }),
                }),
                _jsxs(Button, {
                  variant: "outline",
                  size: "sm",
                  onClick: resetFilters,
                  disabled: apiLoading,
                  className:
                    "h-10 border-border bg-background text-foreground hover:bg-muted hover:text-foreground",
                  children: [
                    _jsx(RotateCcw, { className: "h-4 w-4 mr-1" }),
                    " Reset",
                  ],
                }),
              ],
            }),
            _jsx("div", {
              className: "flex items-center justify-end gap-2",
              children: _jsx(Button, {
                variant: "ghost",
                size: "sm",
                onClick: toggleOrder,
                disabled: apiLoading,
                className:
                  "h-8 text-xs text-muted-foreground hover:bg-muted hover:text-foreground",
                children: filters.sortOrder === "desc" ? "Desc" : "Asc",
              }),
            }),
          ],
        }),
      }),
      _jsx(CardContent, {
        className: "px-0 pb-0 pt-6",
        children: _jsxs("div", {
          className: "px-6 pb-6",
          children: [
            showForm &&
              _jsx("div", {
                className: "mb-4",
                children: _jsx(TransactionForm, {
                  transaction: editingTx,
                  onClose: () => {
                    setShowForm(false);
                    setEditingTx(null);
                  },
                }),
              }),
            visibleTransactions.length === 0
              ? _jsxs("div", {
                  className:
                    "rounded-2xl border border-border bg-muted/40 py-20 text-center text-muted-foreground",
                  children: [
                    _jsx(Inbox, {
                      className: "mx-auto mb-3 h-12 w-12 opacity-40",
                    }),
                    _jsx("p", {
                      className: "text-lg font-medium",
                      children: "No transactions found",
                    }),
                    _jsx("p", {
                      className: "mt-1 text-sm",
                      children:
                        "Try adjusting your filters or reset them to see all transactions.",
                    }),
                  ],
                })
              : _jsx("div", {
                  className:
                    "overflow-hidden rounded-2xl border border-border bg-card",
                  children: _jsxs("div", {
                    className: "overflow-x-auto",
                    children: [
                      _jsxs("table", {
                        className:
                          "w-full min-w-[920px] table-fixed border-collapse",
                        children: [
                          _jsxs("colgroup", {
                            children: [
                              _jsx("col", { className: "w-[15%]" }),
                              _jsx("col", { className: "w-[24%]" }),
                              _jsx("col", { className: "w-[20%]" }),
                              _jsx("col", { className: "w-[14%]" }),
                              _jsx("col", {
                                className:
                                  role === "admin" ? "w-[15%]" : "w-[27%]",
                              }),
                              role === "admin" &&
                                _jsx("col", { className: "w-[12%]" }),
                            ],
                          }),
                          _jsx("thead", {
                            children: _jsxs("tr", {
                              className:
                                "bg-muted/50 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
                              children: [
                                _jsx("th", {
                                  className: "px-5 py-4 font-medium",
                                  children: "Date",
                                }),
                                _jsx("th", {
                                  className: "px-5 py-4 font-medium",
                                  children: "Description",
                                }),
                                _jsx("th", {
                                  className: "px-5 py-4 font-medium",
                                  children: "Category",
                                }),
                                _jsx("th", {
                                  className: "px-5 py-4 font-medium",
                                  children: "Type",
                                }),
                                _jsx("th", {
                                  className: "px-5 py-4 font-medium text-right",
                                  children: "Amount",
                                }),
                                role === "admin" &&
                                  _jsx("th", {
                                    className:
                                      "px-5 py-4 font-medium text-right",
                                    children: "Actions",
                                  }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      _jsx("div", {
                        className:
                          "max-h-[600px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding",
                        children: _jsxs("table", {
                          className:
                            "w-full min-w-[920px] table-fixed border-collapse",
                          children: [
                            _jsxs("colgroup", {
                              children: [
                                _jsx("col", { className: "w-[15%]" }),
                                _jsx("col", { className: "w-[24%]" }),
                                _jsx("col", { className: "w-[20%]" }),
                                _jsx("col", { className: "w-[14%]" }),
                                _jsx("col", {
                                  className:
                                    role === "admin" ? "w-[15%]" : "w-[27%]",
                                }),
                                role === "admin" &&
                                  _jsx("col", { className: "w-[12%]" }),
                              ],
                            }),
                            _jsx("tbody", {
                              children: visibleTransactions.map((tx) => {
                                const CategoryIcon =
                                  categoryIconMap[tx.category] ??
                                  CircleDollarSign;
                                return _jsxs(
                                  "tr",
                                  {
                                    className: cn(
                                      "border-t border-border transition-colors hover:bg-muted/30",
                                    ),
                                    children: [
                                      _jsx("td", {
                                        className:
                                          "px-5 py-4 whitespace-nowrap text-sm text-muted-foreground",
                                        children: formatDate(tx.date),
                                      }),
                                      _jsx("td", {
                                        className: "px-5 py-4",
                                        children: _jsx("div", {
                                          className:
                                            "font-medium text-foreground",
                                          children: tx.description,
                                        }),
                                      }),
                                      _jsx("td", {
                                        className: "px-5 py-4",
                                        children: _jsxs(Badge, {
                                          variant: "outline",
                                          className: cn(
                                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                                            categoryChipStyles[tx.category] ??
                                              "bg-slate-500/15 text-slate-600 border-slate-500/20 dark:text-slate-300",
                                          ),
                                          children: [
                                            _jsx(CategoryIcon, {
                                              className: "h-3 w-3",
                                            }),
                                            tx.category,
                                          ],
                                        }),
                                      }),
                                      _jsx("td", {
                                        className: "px-5 py-4",
                                        children: _jsx(Badge, {
                                          variant: "outline",
                                          className: cn(
                                            "rounded-full border px-3 py-1 text-xs font-medium",
                                            tx.type === "income"
                                              ? "border-green-600/20 bg-green-500/10 text-slate-900 dark:bg-green-500/15 dark:text-green-300"
                                              : "border-rose-600/20 bg-rose-500/10 text-slate-900 dark:bg-rose-500/15 dark:text-rose-300",
                                          ),
                                          children: tx.type,
                                        }),
                                      }),
                                      _jsxs("td", {
                                        className: cn(
                                          "px-5 py-4 text-right text-sm font-semibold whitespace-nowrap",
                                          tx.type === "income"
                                            ? "text-slate-900 dark:text-green-400"
                                            : "text-slate-900 dark:text-rose-400",
                                        ),
                                        children: [
                                          tx.type === "income" ? "+" : "-",
                                          formatCurrency(tx.amount),
                                        ],
                                      }),
                                      role === "admin" &&
                                        _jsx("td", {
                                          className: "px-5 py-4",
                                          children: _jsxs("div", {
                                            className:
                                              "flex items-center justify-end gap-1.5",
                                            children: [
                                              _jsx(Button, {
                                                variant: "ghost",
                                                size: "icon",
                                                className:
                                                  "h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground",
                                                onClick: () => {
                                                  setEditingTx(tx);
                                                  setShowForm(true);
                                                },
                                                disabled:
                                                  apiLoading ||
                                                  deletingId === tx.id,
                                                children: _jsx(Pencil, {
                                                  className: "h-3.5 w-3.5",
                                                }),
                                              }),
                                              _jsx(Button, {
                                                variant: "ghost",
                                                size: "icon",
                                                className:
                                                  "h-8 w-8 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700",
                                                onClick: () =>
                                                  void handleDelete(tx.id),
                                                disabled:
                                                  apiLoading ||
                                                  deletingId === tx.id,
                                                children: _jsx(Trash2, {
                                                  className: "h-3.5 w-3.5",
                                                }),
                                              }),
                                            ],
                                          }),
                                        }),
                                    ],
                                  },
                                  tx.id,
                                );
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
          ],
        }),
      }),
    ],
  });
};
export default TransactionsTable;
