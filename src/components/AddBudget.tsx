import { useState } from 'react';
import { useAddBudgetMutation } from '../features/budget/budgetApiSlice';
import type { Category, BudgetCategory } from '../types/index';

const ALL_BUDGET_CATEGORIES: Category[] = [
  'food', 'transport', 'rent', 'entertainment', 'other', 'savings', 'health', 'investment',
];

export default function AddBudget() {
  const [rows, setRows] = useState<BudgetCategory[]>(
    ALL_BUDGET_CATEGORIES.map((category) => ({ category, percentage: 0 }))
  );
  const [addBudget, { isLoading, error }] = useAddBudgetMutation();

  const total = rows.reduce((sum, r) => sum + (r.percentage || 0), 0);
  const isValid = total === 100;

  const updateRow = (index: number, percentage: number) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, percentage } : row))
    );
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!isValid) return;
  try {
    await addBudget({ budgets: rows.filter((r) => r.percentage > 0) }).unwrap();
  } catch (err: any) {
    console.error('Add budget failed:', err);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-xl">
      <h2 className="text-lg font-semibold text-white">Set up your budget</h2>

      {rows.map((row, i) => (
        <div key={row.category} className="flex items-center gap-3">
          <span className="text-gray-300 flex-1">
            {row.category[0].toUpperCase() + row.category.slice(1)}
          </span>

          <input
            type="number"
            min={0}
            max={100}
            value={row.percentage}
            onChange={(e) => updateRow(i, Number(e.target.value))}
            className="bg-gray-800 text-green-400 rounded px-3 py-2 w-24"
          />
          <span className="text-gray-400">%</span>
        </div>
      ))}

      <div className={total === 100 ? 'text-green-400' : 'text-yellow-400'}>
        Total: {total}%
      </div>

{error && (
  <p className="text-red-400 text-sm">
    {(error as any)?.data || 'Something went wrong saving your budget.'}
  </p>
)}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-black font-medium rounded px-4 py-2"
      >
        {isLoading ? 'Saving...' : 'Save Budget'}
      </button>
    </form>
  );
}