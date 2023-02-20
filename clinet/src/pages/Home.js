import React from "react";
import { Container } from "@mui/system";
import TransactionForm from "../components/TransactionForm.js";
import TransactionsList from "../components/TransactionsList.js";
import { useEffect, useState } from "react";

export default function Home() {

    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});


    useEffect(() => {
        fetchTransactions()
    }, [])

    async function fetchTransactions() {
        const res = await fetch('http://localhost:4000/transaction')
        const { data } = await res.json();
        // console.log(data);
        setTransactions(data);
    }

    return (
        <Container>
            <TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction} />
            <TransactionsList transactions={transactions}
                fetchTransactions={fetchTransactions}
                setEditTransaction={setEditTransaction}
            />
        </Container>
    )
}