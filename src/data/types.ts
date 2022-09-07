import { CSSProperties } from 'react'

export interface ProductLine {
  description: string
  duration: string
  hours: string
  quantity: string
  rate: string
}

export interface Invoice {
  id:string
  logo: string
  logoWidth: number
  title: string
  companyName: string
  name: string
  companyAddress: string
  companyAddress2: string
  companyCountry: string
  companyGstin: string
  companyPan: string
  companyEmail: string
  companyPhone: string

  billBy: string
  billTo: string
  clientName: string
  clientAddress: string
  clientAddress2: string
  clientCountry: string
  clientGstin: string
  clientPan: string
  clientEmail: string
  clientPhone: string

  invoiceTitleLabel: string
  invoiceTitle: string
  invoiceDateLabel: string
  invoiceDate: string
  invoiceDueDateLabel: string
  invoiceDueDate: string

  productLineDescription: string
  productLineDuration: string,
  productLineHours: string,
  productLineQuantity: string
  productLineQuantityRate: string
  productLineQuantityAmount: string

  productLines: ProductLine[]

  subTotalLabel: string
  taxLabel: string

  igstLabel: string,
  cgstLabel: string,
  sgstLabel: string,
  igst: string,
  cgst: string,
  sgst: string,

  totalLabel: string
  totalWordsLabel: string
  currency: string

  notesLabel: string
  notes: string
  termLabel: string
  term: string

  bankLabel: string
  accountName: string
  accountNo: string
  bankName: string
  bankIfsc: string

  accountNameLabel: string
  accountNoLabel: string
  bankNameLabel: string
  bankIfscLabel: string

}

export interface CSSClasses {
  [key: string]: CSSProperties
}
