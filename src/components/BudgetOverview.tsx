import { useState } from 'react';
import { useDeleteBudgetMutation } from '../features/budget/budgetApiSlice';
import EditBudget from './EditBudget';
import BudgetRing from './BudgetRing';
import type { Transaction, BudgetCategory } from '../types/index';

type Props = {
  budgetCategories: BudgetCategory[];
  transactions: Transaction[];
  totalIncome: number;
};

export default function BudgetOverview({ budgetCategories, transactions, totalIncome }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteBudget, { isLoading: isDeleting }] = useDeleteBudgetMutation();

  const totalBudget = budgetCategories.reduce(
    (sum, bc) => sum + totalIncome * (bc.percentage / 100),
    0
  );
  const totalSpent = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete your entire budget? This cannot be undone.');
    if (!confirmed) return;
    try {
      await deleteBudget(undefined).unwrap();
    } catch {
      // could surface an error message here if needed
    }
  };

  if (isEditing) {
  return (
    <div className="space-y-3">
      <EditBudget onSaved={() => setIsEditing(false)} />
      <button
        onClick={() => setIsEditing(false)}
        className="text-gray-400 text-sm hover:text-gray-300"
      >
        ← Done editing
      </button>
    </div>
  );
}

  return (
    <div className="bg-gray-900 p-6 rounded-xl space-y-4">
      <h2 className="text-lg font-semibold text-white">Budget Overview</h2>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="flex-1 w-full space-y-4">
          {budgetCategories.map((bc) => {
            const allocated = totalIncome * (bc.percentage / 100);
            const spent = transactions
              .filter((t) => t.type === 'expense' && t.category === bc.category)
              .reduce((sum, t) => sum + t.amount, 0);

            const pct = allocated > 0 ? Math.min(spent / allocated, 1) : 0;
            const isOver = allocated > 0 && spent > allocated;

            return (
              <div key={bc.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">
                    {bc.category[0].toUpperCase() + bc.category.slice(1)} ({bc.percentage}%)
                  </span>
                  <span className={isOver ? 'text-red-400' : 'text-gray-400'}>
                    KES {spent.toLocaleString()} / {allocated.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isOver ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${pct * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <BudgetRing budget={totalBudget} spent={totalSpent} />
      </div>

      <div className="flex gap-4 pt-2 border-t border-gray-800">
        <button onClick={() => setIsEditing(true)} className="text-green-400 text-sm hover:text-green-300">
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-400 text-sm hover:text-red-300 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}