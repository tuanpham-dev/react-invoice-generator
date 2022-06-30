import React, { FC, useState, useEffect } from 'react'
import { Invoice, ProductLine } from '../data/types'
import { initialInvoice, initialProductLine } from '../data/initialData'
import EditableInput from './EditableInput'
// import EditableSelect from './EditableSelect'
import EditableTextarea from './EditableTextarea'
import EditableCalendarInput from './EditableCalendarInput'
import EditableFileImage from './EditableFileImage'
// import countryList from '../data/countryList'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import { Font } from '@react-pdf/renderer'
import Download from './DownloadPDF'
import format from 'date-fns/format'
import { formatCurrency, numInWords } from '../utils/utils'

Font.register({
  family: 'Outfit',
  src: require('../fonts/Outfit.ttf')
})

interface Props {
  data?: Invoice
  pdfMode?: boolean
}

const InvoicePage: FC<Props> = ({ data, pdfMode }) => {
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

        if (name === 'description' || name === 'duration') {
          newProductLine[name] = value
        } else {
          if (
            value[value.length - 1] === '.' ||
            (value[value.length - 1] === '0' && value.includes('.'))
          ) {
            newProductLine[name] = value
          } else {
            const n = parseInt(value)

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
    const productLines = invoice.productLines.filter((productLine, index) => index !== i)

    setInvoice({ ...invoice, productLines })
  }

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }]

    setInvoice({ ...invoice, productLines })
  }

  const calculateAmount = (hours: string, rate: string) => {
    const hoursNumber = parseInt(hours, 10)
    const rateNumber = parseInt(rate, 10)
    const amount = hoursNumber && rateNumber ? hoursNumber * rateNumber : 0

    return formatCurrency(amount)
  }

  useEffect(() => {
    let subTotal = 0

    invoice.productLines.forEach((productLine) => {
      const hoursNumber = parseInt(productLine.hours)
      const rateNumber = parseInt(productLine.rate)
      const amount = hoursNumber && rateNumber ? hoursNumber * rateNumber : 0

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

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        {!pdfMode && <Download data={invoice} />}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-60" pdfMode={pdfMode}>
            <EditableInput
              className="fs-20 bold theme-dark"
              placeholder="Invoice"
              value={invoice.title}
              onChange={(value) => handleChange('title', value)}
              pdfMode={pdfMode}
            />

            <View className="flex mb-5 mt-10" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceTitleLabel}
                  onChange={(value) => handleChange('invoiceTitleLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-75" pdfMode={pdfMode}>
                <EditableInput
                  placeholder="INV-M0012"
                  value={invoice.invoiceTitle}
                  onChange={(value) => handleChange('invoiceTitle', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceDateLabel}
                  onChange={(value) => handleChange('invoiceDateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-75" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDate, dateFormat)}
                  selected={invoiceDate}
                  onChange={(date) =>
                    handleChange(
                      'invoiceDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : ''
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-25" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceDueDateLabel}
                  onChange={(value) => handleChange('invoiceDueDateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-75" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDueDate, dateFormat)}
                  selected={invoiceDueDate}
                  onChange={(date) =>
                    handleChange(
                      'invoiceDueDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : ''
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>

          </View>
          <View className="w-40 right" pdfMode={pdfMode}>
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
        </View>

        <View className="flex mt-10" pdfMode={pdfMode}>
          <View className="w-50 bg-theme-light p-10 rad-sm mr-10" pdfMode={pdfMode}>
            <EditableInput
              className="fs-16 bold theme-dark mb-5"
              value={invoice.billBy}
              onChange={(value) => handleChange('billTo', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              className="fs-14 bold"
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
            <EditableInput
              placeholder="GSTIN: "
              value={invoice.companyGstin}
              onChange={(value) => handleChange('companyGstin', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="PAN: "
              value={invoice.companyPan}
              onChange={(value) => handleChange('companyPan', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Email: "
              value={invoice.companyEmail}
              onChange={(value) => handleChange('companyEmail', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Phone: "
              value={invoice.companyPhone}
              onChange={(value) => handleChange('companyPhone', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-50 bg-theme-light p-10 rad-sm" pdfMode={pdfMode}>
            <EditableInput
              className="fs-16 bold theme-dark mb-5"
              value={invoice.billTo}
              onChange={(value) => handleChange('billTo', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Your Client's Name"
              value={invoice.clientName}
              onChange={(value) => handleChange('clientName', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Client's Address"
              value={invoice.clientAddress}
              onChange={(value) => handleChange('clientAddress', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="City, State Zip"
              value={invoice.clientAddress2}
              onChange={(value) => handleChange('clientAddress2', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.clientGstin}
              onChange={(value) => handleChange('clientGstin', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.clientPan}
              onChange={(value) => handleChange('clientPan', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.clientEmail}
              onChange={(value) => handleChange('clientEmail', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              value={invoice.clientPhone}
              onChange={(value) => handleChange('clientPhone', value)}
              pdfMode={pdfMode}
            />
          </View>
        </View>

        <View className="mt-20 bg-theme-dark flex rad-sm-t" pdfMode={pdfMode}>
          <View className="w-5 p-4-8" pdfMode={pdfMode}>
            <Text></Text>
          </View>
          <View className="w-40 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold"
              value={invoice.productLineDescription}
              onChange={(value) => handleChange('productLineDescription', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-25 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold center"
              value={invoice.productLineDuration}
              onChange={(value) => handleChange('productLineDuration', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-10 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold center"
              value={invoice.productLineHours}
              onChange={(value) => handleChange('productLineHours', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-10 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold center"
              value={invoice.productLineQuantityRate}
              onChange={(value) => handleChange('productLineQuantityRate', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-10 ptb-4" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineQuantityAmount}
              onChange={(value) => handleChange('productLineQuantityAmount', value)}
              pdfMode={pdfMode}
            />
          </View>
        </View>

        {invoice.productLines.map((productLine, i) => {
          const rowColor = i%2 === 0 ? '' : 'bg-theme-light';
          return pdfMode && productLine.description === '' ? (
            <Text key={i}></Text>
          ) : (
            <View key={i} className={`row flex ${rowColor}`} pdfMode={pdfMode}>
              <View className="w-5 p-4-8" pdfMode={pdfMode}>
                <Text key={i} pdfMode={pdfMode}>{(i+1)+"."}</Text>
              </View>
              <View className="w-40 ptb-4" pdfMode={pdfMode}>
                <EditableTextarea
                  className="dark"
                  placeholder="Enter item name/description"
                  value={productLine.description}
                  onChange={(value) => handleProductLineChange(i, 'description', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-25 p-4-8" pdfMode={pdfMode}>
                <EditableTextarea
                  className="dark center"
                  value={productLine.duration}
                  onChange={(value) => handleProductLineChange(i, 'duration', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-10 ptb-4" pdfMode={pdfMode}>
                <EditableInput
                  className="dark center"
                  value={productLine.hours}
                  onChange={(value) => handleProductLineChange(i, 'hours', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-10 ptb-4" pdfMode={pdfMode}>
                <EditableInput
                  className="dark center"
                  value={productLine.rate}
                  onChange={(value) => handleProductLineChange(i, 'rate', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-10 ptb-4" pdfMode={pdfMode}>
                <Text className="dark right" pdfMode={pdfMode}>
                  {calculateAmount(productLine.hours, productLine.rate)}
                </Text>
              </View>
              {!pdfMode && (
                <button
                  className="link row__remove"
                  aria-label="Remove Row"
                  title="Remove Row"
                  onClick={() => handleRemove(i)}
                >
                  <span className="icon icon-remove bg-red"></span>
                </button>
              )}
            </View>
          )
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-60" pdfMode={pdfMode}>
            <View className="mt-10 flex" pdfMode={pdfMode}>
              <Text className='' pdfMode={pdfMode}>{invoice.totalWordsLabel + '' + numInWords(
                  (typeof subTotal !== 'undefined'
                  ? subTotal
                  : 0
                ).toFixed(0)
              )?.toUpperCase()}</Text>
            </View>
            <View className="mt-10 donot-print" pdfMode={pdfMode}>
              {!pdfMode && (
                <button className="link" onClick={handleAdd}>
                  <span className="icon icon-add bg-green mr-10"></span>
                  Add Line Item
                </button>
              )}
            </View>
          </View>
          <View className="w-40" pdfMode={pdfMode}>
            <View className="flex p-5" pdfMode={pdfMode}>
              <View className="w-40 p-5 bd-t" pdfMode={pdfMode}>
                <EditableInput
                  className="bold right"
                  value={invoice.totalLabel}
                  onChange={(value) => handleChange('totalLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60 p-5 bd-t flex" pdfMode={pdfMode}>
                <EditableInput
                  className="dark bold right"
                  value={invoice.currency}
                  onChange={(value) => handleChange('currency', value)}
                  pdfMode={pdfMode}
                />
                <Text className="right bold dark w-auto right" pdfMode={pdfMode}>
                  {formatCurrency(typeof subTotal !== 'undefined'
                    ? subTotal
                    : 0
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-20" pdfMode={pdfMode}>
          <EditableInput
            className="bold theme-dark w-100"
            value={invoice.termLabel}
            onChange={(value) => handleChange('termLabel', value)}
            pdfMode={pdfMode}
          />
          <EditableTextarea
            className="w-100"
            rows={2}
            value={invoice.term}
            onChange={(value) => handleChange('term', value)}
            pdfMode={pdfMode}
          />
        </View>
        <View className="mt-10" pdfMode={pdfMode}>
          <EditableInput
            className="bold theme-dark w-100"
            value={invoice.bankLabel}
            onChange={(value) => handleChange('termLabel', value)}
            pdfMode={pdfMode}
          />

          <View className="flex" pdfMode={pdfMode}>
            <View className="w-17" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.accountNameLabel}
                onChange={(value) => handleChange('accountNameLabel', value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="w-80" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.accountName}
                onChange={(value) => handleChange('accountName', value)}
                pdfMode={pdfMode}
              />
            </View>
          </View>

          <View className="flex" pdfMode={pdfMode}>
            <View className="w-17" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.bankNameLabel}
                onChange={(value) => handleChange('bankNameLabel', value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="w-80" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.bankName}
                onChange={(value) => handleChange('bankName', value)}
                pdfMode={pdfMode}
              />
            </View>
          </View>

          <View className="flex" pdfMode={pdfMode}>
            <View className="w-17" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.accountNoLabel}
                onChange={(value) => handleChange('accountNoLabel', value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="w-80" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.accountNo}
                onChange={(value) => handleChange('accountNo', value)}
                pdfMode={pdfMode}
              />
            </View>
          </View>

          <View className="flex" pdfMode={pdfMode}>
            <View className="w-17" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.bankIfscLabel}
                onChange={(value) => handleChange('bankIfscLabel', value)}
                pdfMode={pdfMode}
              />
            </View>
            <View className="w-80" pdfMode={pdfMode}>
              <EditableInput
                className="bold left"
                value={invoice.bankIfsc}
                onChange={(value) => handleChange('bankIfsc', value)}
                pdfMode={pdfMode}
              />
            </View>
          </View>
          
        </View>
        <View className="mt-20" pdfMode={pdfMode}>
          <EditableTextarea
            className="w-100 center"
            rows={2}
            value={invoice.notes}
            onChange={(value) => handleChange('notes', value)}
            pdfMode={pdfMode}
          />
        </View>
        
      </Page>
    </Document>
  )
}

export default InvoicePage
