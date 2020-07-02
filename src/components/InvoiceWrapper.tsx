import React, { FC, useState, useEffect } from 'react'
import { Invoice, ProductLine } from '../data/types'
import { initialInvoice, initialProductLine } from '../data/initialData'
import EditableInput from './EditableInput'
import EditableSelect from './EditableSelect'
import EditableTextarea from './EditableTextarea'
import countryList from '../data/countryList'

interface Props {}

const InvoiceWrapper: FC<Props> = () => {
  const [invoice, setInvoice] = useState<Invoice>({ ...initialInvoice })
  const [subTotal, setSubTotal] = useState<number>()
  const [saleTax, setSaleTax] = useState<number>()

  const handleChange = (name: keyof Invoice, value: string) => {
    if (name !== 'productLines') {
      const newInvoice = { ...invoice }
      newInvoice[name] = value

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
    const productLines = invoice.productLines.filter((productLine, index) => index !== i)

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

  return (
    <div className="invoice-wrapper">
      <div className="flex mb-20">
        <div className="w-50">
          <EditableInput
            className="fs-20 bold"
            placeholder="Your Company"
            value={invoice.companyName}
            onChange={(value) => handleChange('companyName', value)}
          />
          <EditableInput
            placeholder="Your Name"
            value={invoice.name}
            onChange={(value) => handleChange('name', value)}
          />
          <EditableInput
            placeholder="Company's Address"
            value={invoice.companyAddress}
            onChange={(value) => handleChange('companyAddress', value)}
          />
          <EditableInput
            placeholder="City, State Zip"
            value={invoice.companyAddress2}
            onChange={(value) => handleChange('companyAddress2', value)}
          />
          <EditableSelect
            options={countryList}
            value={invoice.companyCountry}
            onChange={(value) => handleChange('companyCountry', value)}
          />
        </div>
        <div className="w-50">
          <EditableInput
            className="fs-45 right bold"
            placeholder="Invoice"
            value={invoice.title}
            onChange={(value) => handleChange('title', value)}
          />
        </div>
      </div>

      <div className="flex mt-40">
        <div className="w-55">
          <EditableInput
            className="bold dark mb-5"
            value={invoice.billTo}
            onChange={(value) => handleChange('billTo', value)}
          />
          <EditableInput
            placeholder="Your Client's Name"
            value={invoice.clientName}
            onChange={(value) => handleChange('clientName', value)}
          />
          <EditableInput
            placeholder="Client's Address"
            value={invoice.clientAddress}
            onChange={(value) => handleChange('clientAddress', value)}
          />
          <EditableInput
            placeholder="City, State Zip"
            value={invoice.clientAddress2}
            onChange={(value) => handleChange('clientAddress2', value)}
          />
          <EditableSelect
            options={countryList}
            value={invoice.clientCountry}
            onChange={(value) => handleChange('clientCountry', value)}
          />
        </div>
        <div className="w-45">
          <div className="flex mb-5">
            <div className="w-40">
              <EditableInput
                className="bold"
                value={invoice.invoiceTitleLabel}
                onChange={(value) => handleChange('invoiceTitleLabel', value)}
              />
            </div>
            <div className="w-60">
              <EditableInput
                placeholder="INV-12"
                value={invoice.invoiceTitle}
                onChange={(value) => handleChange('invoiceTitle', value)}
              />
            </div>
          </div>
          <div className="flex mb-5">
            <div className="w-40">
              <EditableInput
                className="bold"
                value={invoice.invoiceDateLabel}
                onChange={(value) => handleChange('invoiceDateLabel', value)}
              />
            </div>
            <div className="w-60">
              <EditableInput
                placeholder="Jun 30, 2020"
                value={invoice.invoiceDate}
                onChange={(value) => handleChange('invoiceDate', value)}
              />
            </div>
          </div>
          <div className="flex mb-5">
            <div className="w-40">
              <EditableInput
                className="bold"
                value={invoice.invoiceDueDateLabel}
                onChange={(value) => handleChange('invoiceDueDateLabel', value)}
              />
            </div>
            <div className="w-60">
              <EditableInput
                placeholder="Jul 30, 2020"
                value={invoice.invoiceDueDate}
                onChange={(value) => handleChange('invoiceDueDate', value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-30 bg-dark flex">
        <div className="w-48 p-4-8">
          <EditableInput
            className="white bold"
            value={invoice.productLineDescription}
            onChange={(value) => handleChange('productLineDescription', value)}
          />
        </div>
        <div className="w-17 p-4-8">
          <EditableInput
            className="white bold right"
            value={invoice.productLineQuantity}
            onChange={(value) => handleChange('productLineQuantity', value)}
          />
        </div>
        <div className="w-17 p-4-8">
          <EditableInput
            className="white bold right"
            value={invoice.productLineQuantityRate}
            onChange={(value) => handleChange('productLineQuantityRate', value)}
          />
        </div>
        <div className="w-18 p-4-8">
          <EditableInput
            className="white bold right"
            value={invoice.productLineQuantityAmount}
            onChange={(value) => handleChange('productLineQuantityAmount', value)}
          />
        </div>
      </div>

      {invoice.productLines.map((productLine, i) => (
        <div key={i} className="row flex">
          <div className="w-48 p-4-8 pb-10">
            <EditableTextarea
              className="dark"
              rows={2}
              placeholder="Enter item name/description"
              value={productLine.description}
              onChange={(value) => handleProductLineChange(i, 'description', value)}
            />
          </div>
          <div className="w-17 p-4-8 pb-10">
            <EditableInput
              className="dark right"
              value={productLine.quantity}
              onChange={(value) => handleProductLineChange(i, 'quantity', value)}
            />
          </div>
          <div className="w-17 p-4-8 pb-10">
            <EditableInput
              className="dark right"
              value={productLine.rate}
              onChange={(value) => handleProductLineChange(i, 'rate', value)}
            />
          </div>
          <div className="w-18 p-4-8 pb-10">
            <span className="span right">
              {calculateAmount(productLine.quantity, productLine.rate)}
            </span>
          </div>
          <button
            className="link row__remove"
            aria-label="Remove Row"
            title="Remove Row"
            onClick={() => handleRemove(i)}
          >
            <span className="icon icon-remove bg-red"></span>
          </button>
        </div>
      ))}

      <div className="flex">
        <div className="w-50 mt-10">
          <button className="link" onClick={handleAdd}>
            <span className="icon icon-add bg-green mr-10"></span>
            Add Line Item
          </button>
        </div>
        <div className="w-50 mt-20">
          <div className="flex">
            <div className="w-40 p-5">
              <EditableInput
                value={invoice.subTotalLabel}
                onChange={(value) => handleChange('subTotalLabel', value)}
              />
            </div>
            <div className="w-60 p-5">
              <span className="span right bold dark">{subTotal?.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex">
            <div className="w-40 p-5">
              <EditableInput
                value={invoice.taxLabel}
                onChange={(value) => handleChange('taxLabel', value)}
              />
            </div>
            <div className="w-60 p-5">
              <span className="span right bold dark">{saleTax?.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex bg-gray p-5">
            <div className="w-40 p-5">
              <EditableInput
                value={invoice.totalLabel}
                onChange={(value) => handleChange('totalLabel', value)}
              />
            </div>
            <div className="w-60 p-5 flex">
              <EditableInput
                className="dark bold right ml-60"
                value={invoice.currency}
                onChange={(value) => handleChange('currency', value)}
              />
              <span className="span right bold dark w-auto">
                {(typeof subTotal !== 'undefined' && typeof saleTax !== 'undefined'
                  ? subTotal + saleTax
                  : 0
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <EditableInput
          className="bold w-100"
          value={invoice.notesLabel}
          onChange={(value) => handleChange('notesLabel', value)}
        />
        <EditableTextarea
          className="w-100"
          rows={2}
          value={invoice.notes}
          onChange={(value) => handleChange('notes', value)}
        />
      </div>
      <div className="mt-20">
        <EditableInput
          className="bold w-100"
          value={invoice.termLabel}
          onChange={(value) => handleChange('termLabel', value)}
        />
        <EditableTextarea
          className="w-100"
          rows={2}
          value={invoice.term}
          onChange={(value) => handleChange('term', value)}
        />
      </div>
    </div>
  )
}

export default InvoiceWrapper
