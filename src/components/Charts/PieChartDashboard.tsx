import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material';
import { PieChart, useDrawingArea } from '@mui/x-charts';
import { ExpenseMatrix } from '../../types/financeMatrix';

const size = {
  width: 400,
  height: 300,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 1.7}>
      {children}
    </StyledText>
  );
}

type DashboardProps = {
  expenseMatrix: ExpenseMatrix;
}

const PieChartDashboard = ({ expenseMatrix }: DashboardProps) => {
  
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0)
  const [totalMonthlyBudget, setTotalMonthlyBudget] = useState(expenseMatrix["totalMonthlyBudget"] ?? 1000) 

  useEffect(() => {
    while(currentMonthExpense < expenseMatrix["currentMonthExpense"]){
      setCurrentMonthExpense(prevState => prevState + 1)
    }
  }, [])

  let data = [
    {id:0, value: currentMonthExpense},
    {id:1, value: totalMonthlyBudget - currentMonthExpense},
  ]

  return (
    <PieChart
      series={[
        {
          startAngle: -90,
          endAngle: 90,
          paddingAngle: 1,
          cornerRadius: 5,
          innerRadius: 105,
          outerRadius: 120,
          cy: 150,
          data,
        },
      ]}
      height={250}
      width={300}
  >
    <PieCenterLabel>Center label</PieCenterLabel>
  </PieChart>
  )
}

export default PieChartDashboard