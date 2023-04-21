/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { useState } from "react";
import AccountBalance from './AccountBalance';

const Credits = ({credits, addCredit, accountBalance}) => {
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

    addCredit(newDescription, parseFloat(newAmount));

    setDescription("");
    setAmount("");
  };

  return (
    <div>
      <h1>Credits</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #000" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>Description</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Amount</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((credit) => (
              <tr key={credit.id} style={{ borderBottom: "1px solid #000" }}>
                <td style={{ padding: "8px", textAlign: "left" }}>{credit.description}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{credit.amount.toFixed(2)}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{credit.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <br/>
      <div>
          <h1>Add Credit</h1>
          
          <form onSubmit={handleSubmit}>
          <label>
            Description:
            <input type="text" value={newDescription} onChange={handleDescriptionChange} />
          </label>
          <label>
            Amount:
            <input type="number" step="0.01" value={newAmount} onChange={handleAmountChange} />
          </label>
          <button type="submit">Add Credit</button>
        </form>
      </div>
      <br/><br/>
      <AccountBalance accountBalance={accountBalance}/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;