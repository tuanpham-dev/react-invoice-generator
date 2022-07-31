import React, { useState } from 'react'
import InvoicePage from '../components/InvoicePage'
import { initialInvoice } from '../data/initialData';

const currencyList = {
  'INR': { symbol: '₹', code: 'INR', label: 'INR', text: 'Rupees' },
  'USD': { symbol: '$', code: 'USD', label: 'USD', text: 'USD' },
  'AUD': { symbol: '$', code: 'AUD', label: 'AUD', text: 'AUD' }
}


function InvoiceScreen() {
  const [currency, setCurrency] = useState('INR');
  const [taxOptions, setTaxOptions] = useState({
    cgst: false,
    sgst: false,
    igst: false,
  });
  const [monthlyTemplate, setMonthlyTemplate] = useState(true);

  const onChangeCurrency = (event) => {
    setCurrency(event.target.value)
  }

  const onChangeTaxOption = (type) => () => {
    console.log(type)
    setTaxOptions(opt => ({
      ...opt,
      [type]: !opt[type]
    }))
  }

  return (
    <div>
      <h1 className="center fs-30">Invoice Generator</h1>
      <div className='flex mb-5'>
        <section>
          <select value={currency} onChange={onChangeCurrency}>
            <option value={"INR"}>₹ - Rupee</option>
            <option value={"USD"}>$ - USD</option>
            <option value={"AUD"}>$ - AUD</option>
          </select> 
        </section>
        <section className='pl-5 flex'>
          <div className='pl-5'>
            <input type="checkbox" value={taxOptions.igst} onChange={onChangeTaxOption('igst')} id="show-igst" />
            <label htmlFor="show-igst">IGST</label>
          </div>
          <div className='pl-5'>
            <input type="checkbox" value={taxOptions.cgst} onChange={onChangeTaxOption('cgst')} id="show-cgst" />
            <label htmlFor="show-cgst">CGST</label>
          </div>
          <div className='pl-5'>
            <input type="checkbox" value={taxOptions.sgst} onChange={onChangeTaxOption('sgst')} id="show-sgst" />
            <label htmlFor="show-sgst">SGST</label>
          </div>
        </section>
        {/* <section className='pl-5'>
          <div>
            <input type="checkbox" value={monthlyTemplate} onChange={() => setMonthlyTemplate(v => !v)} id="monthly-template" />
            <label htmlFor="monthly-template">Template without Hours</label>
          </div>
        </section> */}
      </div>
      <div id="section-to-print">
        <InvoicePage
          taxOptions={taxOptions}
          currency={currencyList[currency]}
          // monthlyTemplate={monthlyTemplate}
          data={{ ...initialInvoice }}
          />
      </div>
    </div>
  )
}

export default InvoiceScreen
