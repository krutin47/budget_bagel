import React from 'react'
import Overview from '../../components/Overview/Overview'
import './Dashboard.css'

type Props = {}

const Dashboard = (props: Props) => {

  return (
    <div className="dashboard-container">
      <header>
        <h1>Dashboard</h1>
        <p>Welcome to Finance Management</p>
      </header>

      <Overview/>

      {/* <Goals/>

      <RecentTransections/> */}

    </div>
  )
}

export default Dashboard