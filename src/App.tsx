import Balance from "./components/Balance"
import AddTransaction from "./components/AddTransaction"
import TransactionList from "./components/TransactionList"
import Summary from "./components/Summary"
import Register from './components/Register'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          💰 Track Pesa
        </h1>
        <Register />
        <Balance />
        <Summary />
        <AddTransaction />
        <TransactionList />
      </div>
    </div>
  )
}

export default App