import { useAppSelector, useAppDispatch } from "../app/hooks"
import { deleteTransaction } from "../features/transactions/transactionSlice"

export default function TransactionList() {
  const dispatch = useAppDispatch()
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  )

  if (transactions.length === 0) {
    return <p>No transactions yet!</p>
  }

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.map((t) => (
        <div key={t.id}>
          <div>
            <p>{t.title}</p>
            <p>{t.category} • {t.date}</p>
          </div>
          <div>
            <p>{t.type === "income" ? "+" : "-"} KES {t.amount.toLocaleString()}</p>
            <button onClick={() => dispatch(deleteTransaction(t.id))}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}