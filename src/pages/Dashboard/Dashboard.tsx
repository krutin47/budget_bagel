import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/AxiosInstance'
import Overview from '../../components/Overview/Overview'
import { ExpenseMatrix, UserMatrix } from '../../types/financeMatrix'
import { calculatePercentageChange } from '../../utils/calculateParcentageChange'
import './Dashboard.css'
import Goals from '../../components/Goals/Goals'
import BudgetBreakDown from '../../components/BudgetBreakdown/BudgetBreakdown'
import Transections from '../../components/Transections/Transections'

type Props = {}

const Dashboard = (props: Props) => {

  const [userMatrix, setUserMatrix] = useState<UserMatrix[]>([])
  const [expenseMatrix, setExpenseMatrix] = useState<ExpenseMatrix>({})

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
        
        const updatedExpenseMatrix = {
          'currentMonthExpense': (data.filter(expense => expense.title === 'Current Expense'))[0]?.amount
        }
        setExpenseMatrix(updatedExpenseMatrix)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <header>
        <h1>Dashboard</h1>
        <p>Welcome to Finance Management</p>
      </header>

      <Overview userMatrix={userMatrix}/>
      <BudgetBreakDown expenseMatrix={expenseMatrix}/>
      
      <div className="finance-dashboard">
        <Goals />
        <Transections />
      </div>

      {/* <RecentTransections/> */}

    </div>
  )
}

export default Dashboard