import React from 'react'
import ExpensePieChart from '../Charts/ExpensePieChart'
import { ExpenseMatrix } from '../../types/financeMatrix'

import './BudgetBreakdown.css'

type Props = {
  expenseMatrix: ExpenseMatrix
}

const BudgetBreakDown = ({ expenseMatrix }: Props) => {
  const expenses = [
    { category: "Food", amount: 1200, percentage: 38, color: "#E67E22" },
    { category: "Transport", amount: 700, percentage: 22, color: "#F39C12" },
    { category: "Healthcare", amount: 400, percentage: 12, color: "#F1C40F" },
    { category: "Education", amount: 300, percentage: 9, color: "#2ECC71" },
    { category: "Clothes", amount: 250, percentage: 8, color: "#27AE60" },
    { category: "Pets", amount: 180, percentage: 6, color: "#16A085" },
    { category: "Entertainment", amount: 150, percentage: 5, color: "#8D6E63" },
  ];
  return (
    <div className="balance-container">
      {/* Balance Trends */}
      <div className="balance-trends">
        {/* <div className="balance-header">
          <h3>Balance Trends</h3>
          <p className="balance-amount">$221,478</p>
          <p className="balance-change positive">⬆ 12.25% Last Month</p>
        </div> */}

        {/* Placeholder for Graph */}
        <div className="graph-placeholder">
          <ExpensePieChart expenseMatrix={expenseMatrix}/>
        </div>
      </div>

      {/* Monthly Expenses Breakdown */}
      <div className="expenses-breakdown">
        <h3>Monthly Expenses Breakdown</h3>
        <div className="progress-bar">
          {expenses.map((exp, index) => (
            <div
              key={index}
              className="progress-segment"
              style={{ width: `${exp.percentage}%`, backgroundColor: exp.color }}
            ></div>
          ))}
        </div>

        <ul className="expenses-list">
          {expenses.map((exp, index) => (
            <li key={index} className="expense-item">
              <span className="dot" style={{ backgroundColor: exp.color }}></span>
              <span className="category">{exp.category}</span>
              <span className="amount">${exp.amount}</span>
              <span className="percentage">{exp.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BudgetBreakDown