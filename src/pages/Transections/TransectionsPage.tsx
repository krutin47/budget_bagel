import React from 'react'
import Transections from '../../components/Transections/Transections'
import TransectionForm from '../../components/TransectionForm/TransectionForm'

type Props = {}

const TransectionsPage = (props: Props) => {
  const handleTransactionSubmit = (data: any) => {
    console.log("Transaction Added:", data);
  };

  return (
    <div className="finance-dashboard">
      <TransectionForm onSubmit={handleTransactionSubmit}/>
      <Transections />
    </div>
  )
}

export default TransectionsPage