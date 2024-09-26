// src/features/expenses-view/ExpensesVoiceDialog.tsx
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
import { Mic } from 'lucide-react'; // Asegúrate de tener instalado lucide-react

interface Expense {
    id: number;
    date: string;
    concept: string;
    amount: number;
}

interface ExpensesVoiceDialogProps {
    onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpensesVoiceDialog: React.FC<ExpensesVoiceDialogProps> = ({ onAddExpense }) => {
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

    const handleVoiceInput = () => {
        // Aquí iría la lógica para manejar la entrada de voz
        console.log("Iniciando entrada de voz...");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4">Añadir con Voz</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Añadir Nuevo Gasto con Voz</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Usa el botón de micrófono para añadir un gasto por voz o completa el formulario manualmente.
                </DialogDescription>
                <div className="flex justify-center my-4">
                    <Button 
                        onClick={handleVoiceInput}
                        className="rounded-full p-4 h-16 w-16"
                    >
                        <Mic className="h-8 w-8" />
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default ExpensesVoiceDialog;
