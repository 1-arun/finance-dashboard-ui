import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Transaction, TransactionType } from "@/types/finance";
import { CATEGORIES } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface Props {
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionForm = ({ transaction, onClose }: Props) => {
  const { addTransaction, editTransaction } = useFinance();
  const [type, setType] = useState<TransactionType>(transaction?.type || "expense");
  const [description, setDescription] = useState(transaction?.description || "");
  const [amount, setAmount] = useState(transaction?.amount?.toString() || "");
  const [category, setCategory] = useState(transaction?.category || "");
  const [date, setDate] = useState(transaction?.date || new Date().toISOString().split("T")[0]);

  const categories = type === "income" ? CATEGORIES.income : CATEGORIES.expense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category) return;

    const data = { description, amount: parseFloat(amount), category, type, date };
    if (transaction) {
      editTransaction(transaction.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  return (
    <Card className="border-primary/20 animate-fade-in">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold">{transaction ? "Edit" : "Add"} Transaction</CardTitle>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" step="0.01" required />
          <Select value={type} onValueChange={(v) => { setType(v as TransactionType); setCategory(""); }}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Button type="submit" className="sm:col-span-1">{transaction ? "Update" : "Add"}</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
