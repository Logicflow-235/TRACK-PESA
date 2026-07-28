import Balance from "./components/Balance"
import AddTransaction from "./components/AddTransaction"
import TransactionList from "./components/TransactionList"
import Summary from "./components/Summary"
import Register from './components/Register'
import Login from "./components/login"
import { logout } from "./features/auth/authSlice"
import { useAppSelector, useAppDispatch } from "./app/hooks"
export default function App() {
  const  dispatch =useAppDispatch();
  const token= useAppSelector((state)=>state.auth.token);
  const handleLogout =()=>{
    dispatch(logout())
  }
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
          💰 Track Pesa
        </h1>
        <Register />
        <Login/>
        <Balance />
        <Summary />
        <AddTransaction />
        <TransactionList />
        {token &&(
          <button onClick={handleLogout}className="text-red-400 text-sm">Logout</button>
        )}
      </div>
    </div>
  )
}

