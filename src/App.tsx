import Balance from "./components/Balance";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
function App(){
  return(
    <div>
      <h1>TRACK PESA</h1>
      <Balance/>
      <AddTransaction/>
      <TransactionList/>
    </div>
  )
}
export default App