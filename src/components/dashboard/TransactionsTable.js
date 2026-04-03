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
      (transaction) =>
        `${transaction.date},${transaction.description},${transaction.amount},${transaction.category},${transaction.type}`,
    );

    const blob = new Blob([headers.concat(rows).join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "transactions.csv";
    anchor.click();
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

  const renderMobileCard = (transaction) => {
    const CategoryIcon =
      categoryIconMap[transaction.category] ?? CircleDollarSign;

    return (
      <div
        key={transaction.id}
        className="rounded-2xl border border-border bg-card p-4 shadow-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              {formatDate(transaction.date)}
            </p>
            <p className="mt-1 truncate text-base font-semibold text-foreground">
              {transaction.description}
            </p>
          </div>

          <div
            className={cn(
              "whitespace-nowrap text-right text-sm font-semibold",
              transaction.type === "income"
                ? "text-slate-900 dark:text-green-400"
                : "text-slate-900 dark:text-rose-400",
            )}
          >
            {transaction.type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
              categoryChipStyles[transaction.category] ??
                "bg-slate-500/15 text-slate-600 border-slate-500/20 dark:text-slate-300",
            )}
          >
            <CategoryIcon className="h-3 w-3" />
            {transaction.category}
          </Badge>

          <Badge
            variant="outline"
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              transaction.type === "income"
                ? "border-green-600/20 bg-green-500/10 text-slate-900 dark:bg-green-500/15 dark:text-green-300"
                : "border-rose-600/20 bg-rose-500/10 text-slate-900 dark:bg-rose-500/15 dark:text-rose-300",
            )}
          >
            {transaction.type}
          </Badge>
        </div>

        {role === "admin" && (
          <div className="mt-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-border bg-background text-foreground hover:bg-muted hover:text-foreground"
              onClick={() => {
                setEditingTx(transaction);
                setShowForm(true);
              }}
              disabled={apiLoading || deletingId === transaction.id}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 border-rose-600/20 bg-background text-rose-600 hover:bg-rose-500/10 hover:text-rose-700"
              onClick={() => void handleDelete(transaction.id)}
              disabled={apiLoading || deletingId === transaction.id}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderDesktopRow = (transaction) => {
    const CategoryIcon =
      categoryIconMap[transaction.category] ?? CircleDollarSign;

    return (
      <tr
        key={transaction.id}
        className="border-t border-border transition-colors hover:bg-muted/30"
      >
        <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground">
          {formatDate(transaction.date)}
        </td>
        <td className="px-5 py-4">
          <div className="font-medium text-foreground">
            {transaction.description}
          </div>
        </td>
        <td className="px-5 py-4">
          <Badge
            variant="outline"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
              categoryChipStyles[transaction.category] ??
                "bg-slate-500/15 text-slate-600 border-slate-500/20 dark:text-slate-300",
            )}
          >
            <CategoryIcon className="h-3 w-3" />
            {transaction.category}
          </Badge>
        </td>
        <td className="px-5 py-4">
          <Badge
            variant="outline"
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              transaction.type === "income"
                ? "border-green-600/20 bg-green-500/10 text-slate-900 dark:bg-green-500/15 dark:text-green-300"
                : "border-rose-600/20 bg-rose-500/10 text-slate-900 dark:bg-rose-500/15 dark:text-rose-300",
            )}
          >
            {transaction.type}
          </Badge>
        </td>
        <td
          className={cn(
            "whitespace-nowrap px-5 py-4 text-right text-sm font-semibold",
            transaction.type === "income"
              ? "text-slate-900 dark:text-green-400"
              : "text-slate-900 dark:text-rose-400",
          )}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </td>
        {role === "admin" && (
          <td className="px-5 py-4">
            <div className="flex items-center justify-end gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => {
                  setEditingTx(transaction);
                  setShowForm(true);
                }}
                disabled={apiLoading || deletingId === transaction.id}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700"
                onClick={() => void handleDelete(transaction.id)}
                disabled={apiLoading || deletingId === transaction.id}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </td>
        )}
      </tr>
    );
  };

  return (
    <Card className="glass-card overflow-hidden animate-fade-in">
      <CardHeader className="border-b border-border px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-4">
          {apiError && (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-700 dark:text-rose-300">
              <span>{apiError}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-[11px]"
                onClick={clearApiError}
              >
                Dismiss
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                All Transactions
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage and review all your transactions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {role === "admin" && (
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingTx(null);
                    setShowForm(true);
                  }}
                  disabled={apiLoading}
                  className="border border-border bg-primary text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              )}

              <Button
                size="sm"
                variant="outline"
                onClick={exportCSV}
                disabled={apiLoading}
                className="border-border bg-background text-foreground transition-transform hover:scale-105 hover:bg-muted hover:text-foreground"
              >
                <FileDown className="mr-1 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="h-10 border-border bg-background pl-9 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                value={filters.search}
                onChange={(event) => setFilters({ search: event.target.value })}
                disabled={apiLoading}
              />
            </div>

            <Select
              value={filters.type}
              onValueChange={(value) => setFilters({ type: value })}
              disabled={apiLoading}
            >
              <SelectTrigger className="h-10 w-full border-border bg-background text-foreground lg:w-[140px]">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              disabled={apiLoading}
            >
              <SelectTrigger className="h-10 w-full border-border bg-background text-foreground lg:w-[180px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryList
                  .filter((category) => category !== "all")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleSort}
              title={`Sort by ${filters.sortBy === "date" ? "amount" : "date"}`}
              disabled={apiLoading}
              className="h-10 w-10 border-border bg-background text-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              disabled={apiLoading}
              className="h-10 border-border bg-background text-foreground hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="mr-1 h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleOrder}
              disabled={apiLoading}
              className="h-8 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {filters.sortOrder === "desc" ? "Desc" : "Asc"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 pb-0 pt-6">
        <div className="px-4 pb-6 sm:px-6">
          {showForm && (
            <div className="mb-4">
              <TransactionForm
                transaction={editingTx}
                onClose={() => {
                  setShowForm(false);
                  setEditingTx(null);
                }}
              />
            </div>
          )}

          {visibleTransactions.length === 0 ? (
            <div className="rounded-2xl border border-border bg-muted/40 py-20 text-center text-muted-foreground">
              <Inbox className="mx-auto mb-3 h-12 w-12 opacity-40" />
              <p className="text-lg font-medium">No transactions found</p>
              <p className="mt-1 text-sm">
                Try adjusting your filters or reset them to see all
                transactions.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="hidden md:block md:overflow-x-auto">
                <table className="w-full min-w-[920px] table-fixed border-collapse">
                  <colgroup>
                    <col className="w-[15%]" />
                    <col className="w-[24%]" />
                    <col className="w-[20%]" />
                    <col className="w-[14%]" />
                    <col className={role === "admin" ? "w-[15%]" : "w-[27%]"} />
                    {role === "admin" && <col className="w-[12%]" />}
                  </colgroup>

                  <thead>
                    <tr className="bg-muted/50 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      <th className="px-5 py-4 font-medium">Date</th>
                      <th className="px-5 py-4 font-medium">Description</th>
                      <th className="px-5 py-4 font-medium">Category</th>
                      <th className="px-5 py-4 font-medium">Type</th>
                      <th className="px-5 py-4 font-medium text-right">
                        Amount
                      </th>
                      {role === "admin" && (
                        <th className="px-5 py-4 font-medium text-right">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody>{visibleTransactions.map(renderDesktopRow)}</tbody>
                </table>
              </div>

              <div className="space-y-3 p-4 md:hidden">
                {visibleTransactions.map(renderMobileCard)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
