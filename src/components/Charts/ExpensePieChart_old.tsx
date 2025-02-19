import React, { useEffect, useState } from 'react'
import { Stack, styled } from '@mui/material';
import { PieChart, useDrawingArea } from '@mui/x-charts';
import { ExpenseMatrix } from '../../types/financeMatrix';

const size = {
  width: 500,
  height: 400,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 24,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 1.5} y={top + height / 1.5}>
      {children}
    </StyledText>
  );
}

type DashboardProps = {
  expenseMatrix: ExpenseMatrix;
}

const ExpensePieChart = ({ expenseMatrix }: DashboardProps) => {
  
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0)
  const totalMonthlyBudget = expenseMatrix["totalMonthlyBudget"] ?? 1500
  const targetExpense = expenseMatrix["currentMonthExpense"] ?? 0

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentMonthExpense < targetExpense) {
      interval = setInterval(() => {
        setCurrentMonthExpense((prev) =>
          prev + 50 > targetExpense ? targetExpense : prev + 50 // Increment by 10 until target is reached
        );
      }, 50); // Adjust timing for smooth animation
    }

    return () => clearInterval(interval);
  }, [currentMonthExpense, targetExpense]);

  let data = [
    {id:0, value: currentMonthExpense},
    {id:1, value: totalMonthlyBudget - currentMonthExpense},
  ]

  console.log(`Data >> ${data}, value >> ${data[0]?.value}`);
  
  return (
    <div className="pie-chart-container">
      <PieChart
        series={[
          {
            startAngle: -90,
            endAngle: 90,
            paddingAngle: 2,
            cornerRadius: 7,
            innerRadius: 110, // Reduced size for better fit
            outerRadius: 140, // Reduced size for better alignment
            cy: 160, // Centered properly
            cx: 200,
            data,
          },
        ]}
        width={400}
        height={250} // Reduced height for proper fit
      >
        <PieCenterLabel>${currentMonthExpense}</PieCenterLabel>
      </PieChart>
    </div>
  )
}

export default ExpensePieChart