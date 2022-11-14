import { useEffect, useState } from "react";
import  AppBar  from './components/AppBar.js';
import TransactionForm from "./components/TransactionForm.js";

const InitialForm = {
  amount:0,
  description:'',
  date: '',
}

function App() {
  const [form, setForm] = useState(InitialForm);

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

  function handleInput(e){
    
    setForm({ ... form, [e.target.name]:e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault();
    // console.log(form);
    const res = await fetch('http://localhost:4000/transaction',{
      method: "POST",
      body: JSON.stringify(form),
      headers:{
        'content-type': "application/json",
      }
    });
    if(res.ok){
      setForm(InitialForm);
      fetchTransactions();
    }
  }
  return (
    <div>
      <AppBar/>
      <TransactionForm/>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          name="amount"
          value={form.amount}
          onChange={handleInput} 
          placeholder="Enter tansaction amount"
        />
        <input 
          type="text" 
          name="description"
          value={form.description}
          onChange={handleInput} 
          placeholder="Enter tansaction detail"
        />
        <input type="date"
          name="date"
          value={form.date}
          onChange={handleInput} 
        />
        <button type="submit">Submit</button>
      </form>
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