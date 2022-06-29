import { ProductLine, Invoice } from './types'

export const initialProductLine: ProductLine = {
  description: '',
  duration: '',
  hours: '',
  quantity: '1',
  rate: '0',
}

export const initialInvoice: Invoice = {
  logo: '',
  logoWidth: 110,
  title: 'Invoice',
  companyName: 'Pentafox Technologies Private Limited',
  name: '',
  companyAddress: '',
  companyAddress2: '',
  companyCountry: 'India',
  companyGstin: '-',
  companyPan: '-',
  companyEmail: '-',
  companyPhone: '-',
  billBy: 'Billed By',
  billTo: 'Billed To',
  clientName: '',
  clientAddress: '',
  clientAddress2: '',
  clientGstin: '-',
  clientPan: '-',
  clientEmail: '-',
  clientPhone: '-',
  clientCountry: 'United States',
  invoiceTitleLabel: 'Invoice No',
  invoiceTitle: '',
  invoiceDateLabel: 'Invoice Date',
  invoiceDate: '',
  invoiceDueDateLabel: 'Due Date',
  invoiceDueDate: '',
  productLineDescription: 'Description',
  productLineDuration: 'Duration',
  productLineHours: 'Hours',
  productLineQuantity: 'Qty',
  productLineQuantityRate: 'Rate',
  productLineQuantityAmount: 'Amount',
  productLines: [
    {
      description: 'Brochure Design',
      duration: '2',
      hours: '2',
      quantity: '2',
      rate: '100',
    },
    { ...initialProductLine },
    { ...initialProductLine },
  ],
  subTotalLabel: 'Sub Total',
  taxLabel: 'Sale Tax (10%)',
  totalLabel: 'Total',
  totalWordsLabel: 'Total (in Words): ',
  currency: '₹',
  notesLabel: 'Bank Details',
  notes: 'For any enquiry, reach out via email at YOUR_EMAIL, call on +91 98888 98888',
  termLabel: 'Terms & Conditions',
  term: 'Please make the payment by the due date.',

  accountNameLabel: 'Account name',
  accountNoLabel: 'Account No.',
  bankNameLabel: 'Bank name',
  bankIfscLabel: 'IFSC',

  bankLabel: 'Bank Details',
  accountName: '- ',
  accountNo: '- ',
  bankName: '- ',
  bankIfsc: '- '
}
