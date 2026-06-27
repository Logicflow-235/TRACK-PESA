import Balance from "./components/Balance";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
function App(){
  return(
    <div>
      <h1>TRACK PESA</h1>
      <Balance/>
      <AddTransaction/>
      <TransactionList/>
      <Summary/>
    </div>
  )
}
export default App