import InvoicePage from './components/InvoicePage'
import { Invoice } from './data/types'
import './scss/main.scss'

function App() {
  const savedInvoice = window.localStorage.getItem('invoiceData')
  let data = null

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice)
    }
  } catch (_e) {}

  const onInvoiceUpdated = (invoice: Invoice) => {
    console.log('Invoice updated', invoice)
  }

  return (
    <div className="app">
      <h1 className="center fs-30">React Invoice Generator</h1>
      <InvoicePage data={data} onChange={onInvoiceUpdated} />
    </div>
  )
}

export default App
