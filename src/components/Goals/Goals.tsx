import React, { useEffect, useState } from 'react'
import { ExpenseMatrix } from '../../types/financeMatrix'

import './Goals.css'
import { SavingGoal } from '../../types/savingGoals'
import axiosInstance from '../../utils/AxiosInstance'
import Goal from './Goal'

type expenseMatrixProps = {

}

const Goals = (props: expenseMatrixProps) => {
  
  const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([])

  useEffect(()=>{
    const getRecentTransections = async () => {
      try {
        const response = await axiosInstance.get('/getSavingGoals')
        const data: SavingGoal[] = await response.data
        setSavingGoals(data)       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getRecentTransections()
    return () => {

    }
  }, [])

  return (
    <div className="saving-goals">
      <h3>Saving Goals</h3>
      <div className="goal-list">
        {savingGoals.map((goal, index) => (
          <Goal goal={goal} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Goals