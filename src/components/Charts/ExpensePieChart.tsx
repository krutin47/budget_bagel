import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ExpenseMatrix } from "../../types/financeMatrix";

// Red for used budget, Gray for remaining budget
const COLORS = ["#e74c3c", "#ecf0f1"]; 

type ExpensePieChartProps = {
  expenseMatrix: ExpenseMatrix;
};

const ExpensePieChart = ({ expenseMatrix }: ExpensePieChartProps) => {
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const totalMonthlyBudget = expenseMatrix["totalMonthlyBudget"] ?? 1500;
  const targetExpense = expenseMatrix["currentMonthExpense"] ?? 0;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentMonthExpense < targetExpense) {
      interval = setInterval(() => {
        setCurrentMonthExpense((prev) =>
          prev + 50 > targetExpense ? targetExpense : prev + 50
        );
      }, 50);
    }

    return () => clearInterval(interval);
  }, [currentMonthExpense, targetExpense]);

  const data = [
    { name: "Spent", value: currentMonthExpense },
    { name: "Remaining", value: totalMonthlyBudget - currentMonthExpense },
  ];

  return (
    <div className="recharts-container">
      <div className="balance-header">
        <h3>Current Budget</h3>
        <p className="balance-amount">${currentMonthExpense}</p>
        <p className="balance-change positive">{Math.abs(((currentMonthExpense-totalMonthlyBudget) / totalMonthlyBudget) * 100).toFixed(2)}% balance Remaining</p>
      </div>
      <ResponsiveContainer minWidth={300} minHeight={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%" // Center Horizontally
            cy="100%" // Moves the center to the bottom for half-circle effect
            startAngle={180} // Starts from the left
            endAngle={0} // Ends at the right
            innerRadius={200} // Thickness control
            outerRadius={230} // Size control
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* <div className="center-label">${currentMonthExpense}</div> */}
    </div>
  );
};

export default ExpensePieChart;
