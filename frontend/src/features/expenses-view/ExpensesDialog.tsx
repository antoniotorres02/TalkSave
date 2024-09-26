// src/features/expenses-view/ExpensesDialog.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Expense {
    id: number;
    date: string;
    concept: string;
    amount: number;
}

interface ExpensesDialogProps {
    onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpensesDialog: React.FC<ExpensesDialogProps> = ({ onAddExpense }) => {
    const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
        date: '',
        concept: '',
        amount: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewExpense(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddExpense(newExpense);
        setNewExpense({ date: '', concept: '', amount: 0 });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4">Añadir Gasto</Button>
            </DialogTrigger>
            <DialogContent className='bg-background text-foreground dark:bg-background dark:text-foreground'>
                <DialogHeader>
                    <DialogTitle>Añadir Nuevo Gasto</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Completa el formulario para añadir un nuevo gasto.
                </DialogDescription>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right font-bold">
                                Fecha
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={newExpense.date}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="concept" className="text-right font-bold">
                                Concepto
                            </Label>
                            <Input
                                id="concept"
                                name="concept"
                                value={newExpense.concept}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right font-bold">
                                Monto
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={newExpense.amount}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Guardar Gasto</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ExpensesDialog;
