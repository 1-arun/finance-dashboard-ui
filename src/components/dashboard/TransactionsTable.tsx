import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown, Plus, Pencil, Trash2, FileDown, Inbox } from "lucide-react";
import TransactionForm from "./TransactionForm";
import { Transaction } from "@/types/finance";

const TransactionsTable = () => {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const toggleSort = () => {
    setFilters({ sortBy: filters.sortBy === "date" ? "amount" : "date" });
  };

  const toggleOrder = () => {
    setFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" });
  };

  const exportCSV = () => {
    const headers = ["Date,Description,Amount,Category,Type"];
    const rows = filteredTransactions.map(
      (t) => `${t.date},${t.description},${t.amount},${t.category},${t.type}`
    );
    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold">All Transactions</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            {role === "admin" && (
              <Button size="sm" onClick={() => { setEditingTx(null); setShowForm(true); }} className="hover:scale-105 transition-transform">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={exportCSV} className="hover:scale-105 transition-transform">
              <FileDown className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
          </div>
          <Select value={filters.type} onValueChange={(v) => setFilters({ type: v as any })}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={toggleSort} title={`Sort by ${filters.sortBy === "date" ? "amount" : "date"}`}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleOrder} className="text-xs text-muted-foreground">
            {filters.sortOrder === "desc" ? "↓ Desc" : "↑ Asc"}
          </Button>
        </div>

        {showForm && (
          <TransactionForm
            transaction={editingTx}
            onClose={() => { setShowForm(false); setEditingTx(null); }}
          />
        )}

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Inbox className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm mt-1">Try adjusting your filters or add a new transaction.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{tx.description}</span>
                    <Badge variant={tx.type === "income" ? "default" : "destructive"} className="text-[10px] px-1.5 py-0 shrink-0">
                      {tx.type}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(tx.date)} · {tx.category}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <span className={`font-semibold text-sm ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                    {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </span>
                  {role === "admin" && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-110 transition-transform" onClick={() => { setEditingTx(tx); setShowForm(true); }}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive hover:scale-110 transition-transform" onClick={() => deleteTransaction(tx.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
