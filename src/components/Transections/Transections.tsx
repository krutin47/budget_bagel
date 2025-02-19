import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/AxiosInstance'
import { Transection } from '../../types/transection'
import './Transections.css'

type Props = {}

const Transections = (props: Props) => {
  
  const [transactions, setTransection] = useState<Transection[]>([])

  useEffect(()=>{
    const getRecentTransections = async () => {
      try {
        const response = await axiosInstance.get('/getTransections')
        const data: Transection[] = await response.data
        setTransection(data)       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getRecentTransections()
    return () => {

    }
  }, [])

  return (
    <div className="transaction-history">
        <h3>Transaction History</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>
                  <span className="category-icon" style={{ backgroundColor: transaction.color }}></span>
                  {transaction.category}
                </td>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td className="transection_amount">{transaction.amount}</td>
                <td>{transaction.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default Transections