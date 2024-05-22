import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Invoice, InvoiceWithId } from '../data/types'
import * as z from 'zod'
import InvoicePage from '../components/InvoicePage'
import '../scss/main.scss'

const InvoiceEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const [invoice, setInvoice] = React.useState<z.infer<typeof InvoiceWithId> | undefined>()
  const [error, setError] = React.useState<string | undefined>()

  const onChange = (invoice: Invoice) => {
    if (!id) return
    setInvoice({ ...invoice, id: id })
  }
  useEffect(() => {
    const fetchInvoiceById = async (idString: string) => {
      const response = await fetch(`http://localhost:3001/invoices/${idString}`)
      const data = await response.json()
      // parse data
      const safeParseData = InvoiceWithId.safeParse(data)
      if (!safeParseData.success) {
        setError(safeParseData.error.message)
        return
      }
      setInvoice(data)
    }
    if (id) fetchInvoiceById(id)
  }, [id])

  if (error) return <div>{error}</div>
  return (
    invoice && (
      <div className="app">
        <InvoicePage onChange={onChange} data={invoice} id={id} />
      </div>
    )
  )
}

export default InvoiceEditorPage

// import InvoicePage from './components/InvoicePage'
// import { Invoice } from './data/types'
// import './scss/main.scss'

// function App() {
//   const savedInvoice = window.localStorage.getItem('invoiceData')
//   let data = null

//   try {
//     if (savedInvoice) {
//       data = JSON.parse(savedInvoice)
//     }
//   } catch (_e) {}

//   const onInvoiceUpdated = (invoice: Invoice) => {
//     console.log('Invoice updated', invoice)
//   }

//   return (
//     <div className="app">
//       <h1 className="center fs-30">React Invoice Generator</h1>
//       <InvoicePage data={data} onChange={onInvoiceUpdated} />
//     </div>
//   )
// }

// export default App
