import React, { FC, useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Invoice } from '../data/types'
import InvoicePage from './InvoicePage'

interface Props {
  data: Invoice
}

const Download: FC<Props> = ({ data }) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(false)

    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [data])

  return (
    <div className={'download-pdf ' + (!show ? 'loading' : '')} title="Save PDF">
      {show && (
        <PDFDownloadLink
          document={<InvoicePage pdfMode={true} data={data} />}
          fileName={`${data.invoiceTitle ? data.invoiceTitle.toLowerCase() : 'invoice'}.pdf`}
          aria-label="Save PDF"
        ></PDFDownloadLink>
      )}
    </div>
  )
}

export default Download
