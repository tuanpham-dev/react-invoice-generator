import React from 'react'
import InvoicePage from '../components/InvoicePage'

function InvoiceScreen() {
  return (
    <div>
      <h1 className="center fs-30">Invoice Generator</h1>
      <div id="section-to-print">
        <InvoicePage />
      </div>
    </div>
  )
}

export default InvoiceScreen
