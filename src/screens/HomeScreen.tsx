import React from 'react'
import Header from '../components/header/Header'
import InvoiceList from '../components/InvoiceList'

function HomeScreen() {
  return (
    <div>
      <Header />
      <div className='app'>
        <div>
          <h2>Invoices</h2>
        </div>
        <InvoiceList />
      </div>
    </div>
  )
}

export default HomeScreen
