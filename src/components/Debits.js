/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { useState } from "react";
import AccountBalance from './AccountBalance';

const Debits = ({debits, addDebit, accountBalance}) => {
  const [newDescription, setDescription] = useState("");
  const [newAmount, setAmount] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addDebit(newDescription, parseFloat(newAmount));

    setDescription("");
    setAmount("");
  };

  return (
    <div>
      <h1>Debits</h1>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #000" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>Description</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Amount</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {debits.map((debit) => (
              <tr key={debit.id} style={{ borderBottom: "1px solid #000" }}>
                <td style={{ padding: "8px", textAlign: "left" }}>{debit.description}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{debit.amount.toFixed(2)}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{debit.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <br/>
      <div>
          <h1>Add Debit</h1>
          
          <form onSubmit={handleSubmit}>
          <label>
            Description:
            <input type="text" value={newDescription} onChange={handleDescriptionChange} />
          </label>
          <label>
            Amount:
            <input type="number" step="0.01" value={newAmount} onChange={handleAmountChange} />
          </label>
          <button type="submit">Add Debit</button>
        </form>
      </div>
      <br/><br/>
      <AccountBalance accountBalance={accountBalance}/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;