import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
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
  return _jsxs(Card, {
    className: "border-primary/20 animate-fade-in",
    children: [
      _jsxs(CardHeader, {
        className: "pb-3 flex flex-row items-center justify-between",
        children: [
          _jsxs(CardTitle, {
            className: "text-sm font-semibold",
            children: [transaction ? "Edit" : "Add", " Transaction"],
          }),
          _jsx(Button, {
            variant: "ghost",
            size: "icon",
            className: "h-7 w-7",
            onClick: onClose,
            disabled: isSubmitting,
            children: _jsx(X, { className: "h-4 w-4" }),
          }),
        ],
      }),
      _jsx(CardContent, {
        children: _jsxs("form", {
          onSubmit: handleSubmit,
          className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
          children: [
            _jsx(Input, {
              placeholder: "Description",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              required: true,
              disabled: isSubmitting,
            }),
            _jsx(Input, {
              type: "number",
              placeholder: "Amount",
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              min: "0",
              step: "0.01",
              required: true,
              disabled: isSubmitting,
            }),
            _jsxs(Select, {
              value: type,
              onValueChange: (v) => {
                setType(v);
                setCategory("");
              },
              disabled: isSubmitting,
              children: [
                _jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }),
                _jsxs(SelectContent, {
                  children: [
                    _jsx(SelectItem, { value: "income", children: "Income" }),
                    _jsx(SelectItem, { value: "expense", children: "Expense" }),
                  ],
                }),
              ],
            }),
            _jsxs(Select, {
              value: category,
              onValueChange: setCategory,
              disabled: isSubmitting,
              children: [
                _jsx(SelectTrigger, {
                  children: _jsx(SelectValue, { placeholder: "Category" }),
                }),
                _jsx(SelectContent, {
                  children: categories.map((c) =>
                    _jsx(SelectItem, { value: c, children: c }, c),
                  ),
                }),
              ],
            }),
            _jsx(Input, {
              type: "date",
              value: date,
              onChange: (e) => setDate(e.target.value),
              disabled: isSubmitting,
            }),
            _jsx(Button, {
              type: "submit",
              className: "sm:col-span-1",
              disabled: isSubmitting,
              children: isSubmitting
                ? "Saving..."
                : transaction
                  ? "Update"
                  : "Add",
            }),
          ],
        }),
      }),
    ],
  });
};
export default TransactionForm;
