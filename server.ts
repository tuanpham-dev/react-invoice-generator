import express from 'express'
import fs from 'fs'
import { InvoiceWithId, TInvoice } from './src/data/types'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import path from 'path'

const app = express()
const port = 3001

let corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
}

app.use(express.static('public'))
app.use(express.json())
app.use(cors(corsOptions))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
  // read allInvoices.json
})

// on ping, simply return allInvoices
app.get('/', async (_req, res) => {
  // read allInvoices from file
  const allInvoices = await fs.readFileSync('allInvoices.json', 'utf8')
  return res.send(allInvoices)
})

app.get('/invoices/:id', async (req, res) => {
  // read allInvoices from file
  const allInvoices = JSON.parse(await fs.readFileSync('allInvoices.json', 'utf8'))
  const invoice = allInvoices.find((invoice: any) => invoice.id === req.params.id)
  if (!invoice) {
    return res.status(404).send('Invoice not found')
  }
  return res.send(invoice)
})

// update or insert
app.post('/upsert', async (req, res) => {
  // read allInvoices from file
  const allInvoices = JSON.parse(await fs.readFileSync('allInvoices.json', 'utf8'))
  const requestBody = req.body
  // validate updatedInvoice
  const updatedInvoice = await InvoiceWithId.safeParse(requestBody)
  if (!updatedInvoice.success) {
    return res.status(400).send(updatedInvoice.error)
  }
  // find invoice with id
  const invoiceIndex = allInvoices.find((invoice: any) => invoice.id === updatedInvoice.data.id)

  if (invoiceIndex === -1) {
    return res.status(404).send('Invoice not found')
  }
  // update invoice
  console.log('UPDATING INVOICE WITH ID', updatedInvoice.data.id)
  console.log('title is', updatedInvoice.data.title)
  allInvoices[invoiceIndex] = updatedInvoice.data
  const otherInvoices = allInvoices.filter((invoice: any) => invoice.id !== updatedInvoice.data.id)
  const updatedInvoices = [...otherInvoices, updatedInvoice.data]
  fs.writeFile('./allInvoices.json', JSON.stringify(updatedInvoices), (err) => {
    if (err) {
      console.log('Error updating invoice', err)
      return res.status(500).send('Error updating invoice')
    } else {
      console.log('Invoice updated successfully')
      return res.send('Invoice updated successfully')
    }
  })
})
