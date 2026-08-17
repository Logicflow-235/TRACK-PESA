import { useState } from "react"
import Balance from "./components/Balance"
import AddTransaction from "./components/AddTransaction"
import TransactionList from "./components/TransactionList"
import Summary from "./components/Summary"
import Register from './components/Register'
import Login from "./components/login"
import { logout } from "./features/auth/authSlice"
import { useAppSelector, useAppDispatch } from "./app/hooks"
import { useGetTransactionsQuery } from "./features/transactions/transactionApiSlice"
import { useGetBudgetQuery } from "./features/budget/budgetApiSlice"
import type { Transaction } from "./types/index";
import AddBudget from "./components/AddBudget";
import BudgetOverview from "./components/BudgetOverview"
type AuthView = "landing" | "login" | "register"

export default function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const [authView, setAuthView] = useState<AuthView>("landing");
  const { data: transactions = [] } = useGetTransactionsQuery(undefined);
  const { data: budgets } = useGetBudgetQuery(undefined, { skip: !token });

  const budgetCategories = budgets?.[0]?.budgets ?? [];

  const totalIncome = transactions
    .filter((t: Transaction) => t.type === "income")
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const handleLogout = () => {
    dispatch(logout())
    setAuthView("landing")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          💰 Track Pesa
        </h1>

        {token && (
          <button onClick={handleLogout} className="text-red-400 text-sm mb-4">
            Logout
          </button>
        )}

        {token ? (
          <>
            <Balance />
            <Summary />
            <div className="mb-6">
              <AddTransaction />
            </div>
            {budgets && budgets.length > 0 ? (
              <BudgetOverview
                budgetCategories={budgetCategories}
                transactions={transactions}
                totalIncome={totalIncome}
              />
            ) : (
              <AddBudget />
            )}
            <TransactionList />
          </>
        ) : authView === "landing" ? (
          <div className="bg-gray-900 rounded-2xl p-8 text-center">
            <p className="text-gray-400 mb-6">
              Track your income and expenses, all in one place.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setAuthView("login")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => setAuthView("register")}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : authView === "login" ? (
          <>
            <Login />
            <button
              onClick={() => setAuthView("landing")}
              className="text-gray-400 text-sm"
            >
              ← Back
            </button>
          </>
        ) : (
          <>
            <Register />
            <button
              onClick={() => setAuthView("landing")}
              className="text-gray-400 text-sm"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  )
}