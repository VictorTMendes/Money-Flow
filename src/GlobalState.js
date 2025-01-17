import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [inputValue, setInputValue] = useState(''); // variável global
    const [accountInfo, setAccountInfo] = useState([])
    const [totalValue, setTotalValue] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0)
    const [totalReceived, setTotalReceived] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState([])
    const [expenses, setExpenses] = useState([])

    return(
        <GlobalContext.Provider value = {{ inputValue, setInputValue, accountInfo, setAccountInfo, totalValue, setTotalValue, totalPaid, setTotalPaid, receivedAmount, setReceivedAmount, expenses, setExpenses, totalReceived, setTotalReceived}}>
            {children}
        </GlobalContext.Provider>
    )
}