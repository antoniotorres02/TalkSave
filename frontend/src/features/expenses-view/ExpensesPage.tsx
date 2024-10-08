// src/features/expenses-view/ExpensesPage.tsx
import React, { useState } from 'react';
import ExpensesTable from './ExpensesTable';


interface Expense {
    id: number;
    date: string;
    concept: string;
    amount: number;
}

const ExpensesPage: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: 1, date: '2023-05-01', concept: 'Compras de supermercado', amount: 50.00 },
        { id: 2, date: '2023-05-02', concept: 'Cena en restaurante', amount: 30.50 },
        { id: 3, date: '2023-05-03', concept: 'Transporte público', amount: 15.75 },
        { id: 4, date: '2023-05-04', concept: 'Suscripción de streaming', amount: 12.99 },
        { id: 5, date: '2023-05-05', concept: 'Compra de libros', amount: 45.20 },
    ]);

    const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
        const id = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
        setExpenses(prev => [...prev, { ...newExpense, id }]);
    };

    return (
        <>
            <ExpensesTable expenses={expenses} handleAddExpense={handleAddExpense} />
        </>
    );
};

export default ExpensesPage;
