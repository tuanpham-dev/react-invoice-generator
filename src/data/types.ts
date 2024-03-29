import { CSSProperties } from 'react'
import { z, TypeOf } from 'zod'

export interface ProductLine {
  description: string
  quantity: string
  rate: string
}

export const TProductLine = z.object({
  description: z.string(),
  quantity: z.string(),
  rate: z.string(),
})

export const TInvoice = z.object({
  logo: z.string(),
  logoWidth: z.number(),
  title: z.string(),
  companyName: z.string(),
  name: z.string(),
  companyAddress: z.string(),
  companyAddress2: z.string(),
  companyCountry: z.string(),
  billTo: z.string(),
  clientName: z.string(),
  clientAddress: z.string(),
  clientAddress2: z.string(),
  clientCountry: z.string(),
  invoiceTitleLabel: z.string(),
  invoiceTitle: z.string(),
  invoiceDateLabel: z.string(),
  invoiceDate: z.string(),
  invoiceDueDateLabel: z.string(),
  invoiceDueDate: z.string(),
  productLineDescription: z.string(),
  productLineQuantity: z.string(),
  productLineQuantityRate: z.string(),
  productLineQuantityAmount: z.string(),
  productLines: z.array(TProductLine),
  subTotalLabel: z.string(),
  taxLabel: z.string(),
  totalLabel: z.string(),
  currency: z.string(),
  notesLabel: z.string(),
  notes: z.string(),
  termLabel: z.string(),
  term: z.string(),
})

export type Invoice = TypeOf<typeof TInvoice>

export interface CSSClasses {
  [key: string]: CSSProperties
}
