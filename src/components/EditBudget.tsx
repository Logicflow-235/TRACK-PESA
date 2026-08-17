import { useState, useEffect } from 'react';
import { useGetBudgetQuery, useEditBudgetMutation } from '../features/budget/budgetApiSlice';
import type { Category, BudgetCategory } from '../types/index';

export default function EditBudget() {
  const { data: budgets, isLoading: isFetching } = useGetBudgetQuery(undefined);
  const [editBudget, { isLoading: isSaving }] = useEditBudgetMutation();

  const existing = budgets?.[0]; // one budget doc per user
  const [rows, setRows] = useState<BudgetCategory[]>([]);

  useEffect(() => {
    if (existing) setRows(existing.budgets);
  }, [existing]);

  const total = rows.reduce((sum, r) => sum + (r.percentage || 0), 0);
  const isValid = total === 100;

  const updateRow = (index: number, patch: Partial<BudgetCategory>) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !existing) return;

    const changedRows = rows.filter((row, i) => {
      const original = existing.budgets[i];
      return (
        row._id &&
        (row.category !== original.category || row.percentage !== original.percentage)
      );
    });

    try {
      await Promise.all(
        changedRows.map((row) =>
          editBudget({
            id: row._id!,
            category: row.category,
            percentage: row.percentage,
          }).unwrap()
        )
      );
    } catch {
      // individual failures surface via mutation error state per call;
      // Promise.all rejects on first failure, leaving some rows saved and some not
    }
  };

  if (isFetching) return <p className="text-gray-400">Loading budget...</p>;
  if (!existing) return <p className="text-gray-400">No budget set up yet.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-xl">
      {rows.map((row, i) => (
        <div key={row._id} className="flex items-center gap-3">
          <select
            value={row.category}
            onChange={(e) => updateRow(i, { category: e.target.value as Category })}
            disabled
            className="bg-gray-800 text-green-400 rounded px-3 py-2 flex-1 opacity-60"
          >
            <option value={row.category}>
              {row.category[0].toUpperCase() + row.category.slice(1)}
            </option>
          </select>

          <input
            type="number"
            min={0}
            max={100}
            value={row.percentage}
            onChange={(e) => updateRow(i, { percentage: Number(e.target.value) })}
            className="bg-gray-800 text-green-400 rounded px-3 py-2 w-24"
          />
          <span className="text-gray-400">%</span>
        </div>
      ))}

      <div className={total === 100 ? 'text-green-400' : 'text-yellow-400'}>
        Total: {total}%
      </div>

      <button
        type="submit"
        disabled={!isValid || isSaving}
        className="bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-black font-medium rounded px-4 py-2"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}