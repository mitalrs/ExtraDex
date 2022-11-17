import { useEffect, useState } from "react";
import  AppBar  from './components/AppBar.js';
import TransactionForm from "./components/TransactionForm.js";


function App() {

  const [transactions, setTransactions] = useState([]);

  useEffect(()=>{
    fetchTransactions()
  },[])

  async function fetchTransactions(){
    const res = await fetch('http://localhost:4000/transaction')
    const {data} = await res.json();
    // console.log(data);
    setTransactions(data);
  }


  
  return (
    <div>
      <AppBar/>
      <TransactionForm fetchTransactions={fetchTransactions}/>
      
      <br/>

      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>description</th>
            <th>Date</th>
          </thead>
          <tbody>
            {transactions.map((trx)=>(
            <tr key={trx._id}>
              <td>{trx.amount}</td>
              <td>{trx.description}</td>
              <td>{trx.date}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;


//1:7