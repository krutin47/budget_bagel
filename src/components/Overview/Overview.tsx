import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/AxiosInstance';
import ExpensePieChart from '../Charts/PieChartDashboard'
import { ExpenseMatrix, UserMatrix } from '../../types/financeMatrix';
import { calculatePercentageChange } from '../../utils/calculateParcentageChange';

import './Overview.css'

type Props = {}

const Overview = (props: Props) => {
  const [userMatrix, setUserMatrix] = useState<UserMatrix[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getExpenseMetrix');
        const data: UserMatrix[] = await response.data;
        
        const updatedData = data.map((expenseItem) => ({
          ...expenseItem,
          ...calculatePercentageChange(expenseItem.amount, expenseItem.lastMonth, expenseItem.isGoodIfIncreased)
        }))
        setUserMatrix(updatedData);        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="stats-grid">
        {userMatrix.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.title}</h3>
            <p className="amount">{stat.amount.toLocaleString()}</p>
            <p className={`change ${stat.isPositive === stat.isGoodIfIncreased ? 'positive' : 'negative'}`}>
              {stat.change} <span>Last month $ {stat.lastMonth.toLocaleString()}</span>
            </p>
          </div>
        ))}
      </section>

      {/* <ExpensePieChart expenseMatrix={userMatrix}/>

      <p>Current Total Money:{userMatrix.currentTotalMoney}</p>
      <p>Current Total Earning:{userMatrix.currentTotalEarning}</p>
      <p>Last Month Expense:{userMatrix.lastMonthExpense}</p>
      <p>Current Month Expense:{userMatrix.currentMonthExpense}</p> */}
      
    </div>
  )
}

export default Overview