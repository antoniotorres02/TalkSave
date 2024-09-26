import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import ExpensesDialog from './ExpensesDialog';
import ExpensesVoiceDialog from './ExpensesVoiceDialog';

interface Expense {
  id: number;
  date: string;
  concept: string;
  amount: number;
}

interface ExpensesTableProps {
  expenses: Expense[];
  handleAddExpense: (expense: Omit<Expense, "id">) => void;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses, handleAddExpense }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card>
      <CardContent>
        <Table>
          <TableCaption>Lista de gastos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead className="text-right">Gasto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.concept}</TableCell>
                <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right font-bold">
          Total de gastos: ${totalExpenses.toFixed(2)}
        </div>
        <div className="flex justify-end gap-2">
          <ExpensesDialog onAddExpense={handleAddExpense} />
          <ExpensesVoiceDialog onAddExpense={handleAddExpense} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesTable;