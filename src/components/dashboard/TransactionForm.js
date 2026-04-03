import { useState } from "react";
import { useFinance } from "@/context/useFinance";
import { CATEGORIES } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TransactionForm = ({ transaction, onClose }) => {
  const { addTransaction, editTransaction } = useFinance();
  const { toast } = useToast();
  const [type, setType] = useState(transaction?.type || "expense");
  const [description, setDescription] = useState(
    transaction?.description || "",
  );
  const [amount, setAmount] = useState(transaction?.amount?.toString() || "");
  const [category, setCategory] = useState(transaction?.category || "");
  const [date, setDate] = useState(
    transaction?.date || new Date().toISOString().split("T")[0],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = type === "income" ? CATEGORIES.income : CATEGORIES.expense;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!description || !amount || !category) return;

    const data = {
      description,
      amount: parseFloat(amount),
      category,
      type,
      date,
    };

    setIsSubmitting(true);

    try {
      if (transaction) {
        await editTransaction(transaction.id, data);
      } else {
        await addTransaction(data);
      }

      toast({
        title: transaction ? "Transaction updated" : "Transaction added",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Action failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-primary/20 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-semibold">
          {transaction ? "Edit" : "Add"} Transaction
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onClose}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <Input
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            disabled={isSubmitting}
          />

          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            min="0"
            step="0.01"
            required
            disabled={isSubmitting}
          />

          <Select
            value={type}
            onValueChange={(value) => {
              setType(value);
              setCategory("");
            }}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={category}
            onValueChange={setCategory}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((currentCategory) => (
                <SelectItem key={currentCategory} value={currentCategory}>
                  {currentCategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            className="sm:col-span-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : transaction ? "Update" : "Add"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
