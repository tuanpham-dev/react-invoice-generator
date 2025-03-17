import { FC, useState, useEffect } from 'react'
import { Invoice, ProductLine } from '../data/types'
import { initialInvoice, initialProductLine } from '../data/initialData'
import EditableInput from './EditableInput'
import EditableSelect from './EditableSelect'
import EditableTextarea from './EditableTextarea'
import EditableCalendarInput from './EditableCalendarInput'
import EditableFileImage from './EditableFileImage'
import countryList from '../data/countryList'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import { Font } from '@react-pdf/renderer'
import Download from './DownloadPDF'
import format from 'date-fns/format'

Font.register({
  family: 'Nunito',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf' },
    {
      src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf',
      fontWeight: 600,
    },
  ],
})

interface Props {
  data?: Invoice
  pdfMode?: boolean
  onChange?: (invoice: Invoice) => void
}

const MyInvoicePage: FC<Props> = ({ data, pdfMode, onChange }) => {
  const [invoice, setInvoice] = useState<Invoice>(data ? { ...data } : { ...initialInvoice })
  const [subTotal, setSubTotal] = useState<number>()
  const [saleTax, setSaleTax] = useState<number>()

  const dateFormat = 'MMM dd, yyyy'
  const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : new Date()
  const invoiceDueDate =
    invoice.invoiceDueDate !== ''
      ? new Date(invoice.invoiceDueDate)
      : new Date(invoiceDate.valueOf())

  if (invoice.invoiceDueDate === '') {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30)
  }

  const handleChange = (name: keyof Invoice, value: string | number) => {
    if (name !== 'productLines') {
      const newInvoice = { ...invoice }

      if (name === 'logoWidth' && typeof value === 'number') {
        newInvoice[name] = value
      } else if (name !== 'logoWidth' && typeof value === 'string') {
        newInvoice[name] = value
      }

      setInvoice(newInvoice)
    }
  }

  const handleProductLineChange = (index: number, name: keyof ProductLine, value: string) => {
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = { ...productLine }

        if (name === 'description') {
          newProductLine[name] = value
        } else {
          if (
            value[value.length - 1] === '.' ||
            (value[value.length - 1] === '0' && value.includes('.'))
          ) {
            newProductLine[name] = value
          } else {
            const n = parseFloat(value)

            newProductLine[name] = (n ? n : 0).toString()
          }
        }

        return newProductLine
      }

      return { ...productLine }
    })

    setInvoice({ ...invoice, productLines })
  }

  const handleRemove = (i: number) => {
    const productLines = invoice.productLines.filter((_, index) => index !== i)

    setInvoice({ ...invoice, productLines })
  }

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }]

    setInvoice({ ...invoice, productLines })
  }

  const calculateAmount = (quantity: string, rate: string) => {
    const quantityNumber = parseFloat(quantity)
    const rateNumber = parseFloat(rate)
    const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

    return amount.toFixed(2)
  }

  useEffect(() => {
    let subTotal = 0

    invoice.productLines.forEach((productLine) => {
      const quantityNumber = parseFloat(productLine.quantity)
      const rateNumber = parseFloat(productLine.rate)
      const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

      subTotal += amount
    })

    setSubTotal(subTotal)
  }, [invoice.productLines])

  useEffect(() => {
    const match = invoice.taxLabel.match(/(\d+)%/)
    const taxRate = match ? parseFloat(match[1]) : 0
    const saleTax = subTotal ? (subTotal * taxRate) / 100 : 0

    setSaleTax(saleTax)
  }, [subTotal, invoice.taxLabel])

  useEffect(() => {
    if (onChange) {
      onChange(invoice)
    }
  }, [onChange, invoice])

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper-my" pdfMode={pdfMode}>
        {!pdfMode && <Download data={invoice} setData={(d) => setInvoice(d)} />}

        <View className="invoice-container" pdfMode={pdfMode}>
          <EditableInput
            className="fs-45 left bold"
            placeholder="Invoice"
            value={invoice.title}
            onChange={(value) => handleChange('title', value)}
            pdfMode={pdfMode}
          />
        </View>

        <View className="logo-pdf" pdfMode={pdfMode}>
          <EditableFileImage
            className="logo"
            placeholder="Your Logo"
            value={invoice.logo}
            width={invoice.logoWidth}
            pdfMode={pdfMode}
            onChangeImage={(value) => handleChange('logo', value)}
            onChangeWidth={(value) => handleChange('logoWidth', value)}
          />
        </View>

        <View className="one-block" pdfMode={pdfMode}>
          company
        </View>
        <View className="one-block" pdfMode={pdfMode}>
          <EditableInput
            className="fs-20 bold"
            placeholder="Your Company"
            value={invoice.companyName}
            onChange={(value) => handleChange('companyName', value)}
            pdfMode={pdfMode}
          />
          <EditableInput
            placeholder="Company's Address"
            value={invoice.companyAddress}
            onChange={(value) => handleChange('companyAddress', value)}
            pdfMode={pdfMode}
          />
          <EditableInput
            placeholder="City, State Zip"
            value={invoice.companyAddress2}
            onChange={(value) => handleChange('companyAddress2', value)}
            pdfMode={pdfMode}
          />
          <EditableSelect
            options={countryList}
            value={invoice.companyCountry}
            onChange={(value) => handleChange('companyCountry', value)}
            pdfMode={pdfMode}
          />
        </View>
        <View className="one-block" pdfMode={pdfMode}>
          bank
        </View>
        <View className="one-block" pdfMode={pdfMode}>
          empty
        </View>
      </Page>
    </Document>
  )
}

export default MyInvoicePage
