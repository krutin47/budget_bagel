import React from 'react'
import { UserMatrix } from '../../types/financeMatrix';

import './Overview.css'

type Props = {
  userMatrix: UserMatrix[]
}

const Overview = ({ userMatrix }: Props) => {

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
    </div>
  )
}

export default Overview