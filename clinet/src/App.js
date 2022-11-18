import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import  AppBar  from './components/AppBar.js';
import TransactionForm from "./components/TransactionForm.js";
import TransactionsList from "./components/TransactionsList.js";



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
      <Container>
      <TransactionForm fetchTransactions={fetchTransactions}/>
      <TransactionsList transactions={transactions} />
      </Container>
       <br/>

    </div>
  );
}

export default App;


//1:7