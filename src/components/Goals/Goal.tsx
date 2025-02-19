import React from 'react'
import { SavingGoal } from '../../types/savingGoals'
import HalfPieChart from '../Charts/HalfPieChart'

type goalProps = {
  goal: SavingGoal 
}

const Goal = ({ goal }: goalProps) => {
  return (
    <div className="goal-item">
      <HalfPieChart percentage={goal.percentage} color={goal.color} />
      <p className="goal-text">{goal.percentage}%</p>
      <p className="goal-title">{goal.title}</p>
    </div>
  )
}

export default Goal