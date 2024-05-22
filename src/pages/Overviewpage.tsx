import React, { useEffect } from 'react'
import '../styles/globals.css'
import { InvoiceWithId, ProductLine } from '../data/types'
import * as z from 'zod'
import { BadgeEuro, Calendar, CircleUser } from 'lucide-react'
import { Link } from 'react-router-dom'

const OverviewPage = () => {
  const [invoices, setInvoices] = React.useState<z.infer<typeof InvoiceWithId>[] | undefined>()
  const [error, setError] = React.useState<string | undefined>()

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch('http://localhost:3001/')
      const data = await response.json()
      // parse data
      const safeParseData = z.array(InvoiceWithId).safeParse(data)
      if (!safeParseData.success) {
        setError(safeParseData.error.message)
        return
      }
      setInvoices(data)
    }
    fetchInvoices()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-center flex flex-col items-center justify-start p-4">
      <div className="text-6xl font-black flex mb-8 text-slate-900">Invoices Overview</div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col items-center gap-4 w-[36rem]">
        <Link to="/new-invoice">
          <button className="bg-green-800 w-full font-bold text-xl text-slate-50 p-4 rounded-lg opacity-80 hover:opacity-100 transition-all">
            Create a new invoice
          </button>
        </Link>
        {invoices && invoices.map((invoice) => <InvoiceCard invoice={invoice} key={invoice.id} />)}
      </div>
    </div>
  )
}

const InvoiceCard = ({ invoice }: { invoice: z.infer<typeof InvoiceWithId> }) => {
  const calculateTotal = (invoice: z.infer<typeof InvoiceWithId>) => {
    return invoice.productLines
      .map(
        (productLine: ProductLine) =>
          parseFloat(productLine.quantity) * parseFloat(productLine.rate),
      )
      .reduce((a, b) => a + b, 0)
  }
  return (
    <Link to={`/invoices/${invoice.id}`}>
      <div className="bg-slate-900 text-white w-full p-4 rounded-lg opacity-80 hover:opacity-100 transition-all">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-3 font-bold text-3xl">Invoice: {invoice.invoiceTitle}</div>
          <div className="flex items-center justify-center gap-2">
            <CircleUser size={35} /> {invoice.clientName}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Calendar /> {invoice.invoiceDate}
          </div>
          <div className="flex items-center justify-center gap-2">
            <BadgeEuro />{' '}
            {calculateTotal(invoice).toLocaleString('nl-NL', {
              style: 'currency',
              currency: 'EUR',
            })}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OverviewPage
