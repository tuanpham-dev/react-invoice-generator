import { ChangeEvent, FC, useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Invoice, TInvoice } from '../data/types'
import InvoicePage from './InvoicePage'
import FileSaver from 'file-saver'

interface Props {
  data: Invoice
  setData(data: Invoice): void
}

const Download: FC<Props> = ({ data, setData }) => {
  const [showDoc, setShowDoc] = useState(true)
  const [t, setT] = useState<null | number>(null)

  useEffect(() => {
    setShowDoc(false)
    if (t) clearTimeout(t)
    setT(
      setTimeout(() => {
        setShowDoc(true)
      }, 500) as any,
    )
  }, [data])

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return

    const file = e.target.files[0]
    file
      .text()
      .then((str: string) => {
        try {
          if (!(str.startsWith('{') && str.endsWith('}'))) {
            str = atob(str)
          }
          const d = JSON.parse(str)
          const dParsed = TInvoice.parse(d)
          console.info('parsed correctly')
          setData(dParsed)
        } catch (e) {
          console.error(e)
          return
        }
      })
      .catch((err) => console.error(err))
  }

  function handleSaveTemplate() {
    const blob = new Blob([JSON.stringify(data)], {
      type: 'text/plain;charset=utf-8',
    })
    FileSaver(blob, title + '.template')
  }

  const title = data.invoiceTitle ? data.invoiceTitle.toLowerCase() : 'invoice'
  return (
    <div className="download-pdf">
      {showDoc ? (
        <PDFDownloadLink
          key="pdf"
          document={<InvoicePage pdfMode={true} data={data} />}
          fileName={`${title}.pdf`}
          aria-label="Save PDF"
          title="Save PDF"
          className="download-pdf__pdf"
        ></PDFDownloadLink>
      ) : (
        <button type="button" className="download-pdf__pdf loading" />
      )}
      <p>Save PDF</p>

      <button
        onClick={handleSaveTemplate}
        aria-label="Save Template"
        title="Save Template"
        className="download-pdf__template_download mt-40"
      />
      <p className="text-small">Save Template</p>

      <label className="download-pdf__template_upload">
        <input type="file" accept=".json,.template" onChange={handleInput} />
      </label>
      <p className="text-small">Upload Template</p>
    </div>
  )
}

export default Download
