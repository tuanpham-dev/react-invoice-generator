import { FC } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Invoice } from '../data/types'
import { useDebounce } from '@uidotdev/usehooks'
import InvoicePage from './InvoicePage'
import { Link } from 'react-router-dom'

interface Props {
  data: Invoice
  saveChanges: () => void
}

const Download: FC<Props> = ({ data, saveChanges }) => {
  const debounced = useDebounce(data, 500)

  // function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
  //   if (!e.target.files?.length) return

  //   const file = e.target.files[0]
  //   file
  //     .text()
  //     .then((str: string) => {
  //       try {
  //         if (!(str.startsWith('{') && str.endsWith('}'))) {
  //           str = atob(str)
  //         }
  //         const d = JSON.parse(str)
  //         const dParsed = TInvoice.parse(d)
  //         console.info('parsed correctly')
  //         setData(dParsed)
  //       } catch (e) {
  //         console.error(e)
  //         return
  //       }
  //     })
  //     .catch((err) => console.error(err))
  // }

  // function handleSaveTemplate() {
  //   const blob = new Blob([JSON.stringify(debounced)], {
  //     type: 'text/plain;charset=utf-8',
  //   })
  //   FileSaver(blob, title + '.template')
  // }

  const title = data.invoiceTitle ? data.invoiceTitle.toLowerCase() : 'invoice'
  return (
    <div className={'download-pdf '}>
      <PDFDownloadLink
        key="pdf"
        document={<InvoicePage pdfMode={true} data={debounced} />}
        fileName={`${title}.pdf`}
        aria-label="Download PDF"
        title="Download PDF"
        className="download-pdf__pdf"
      ></PDFDownloadLink>
      <p>Download PDF</p>

      <button
        onClick={() => {
          saveChanges()
        }}
        className="mt-40 bg-gray"
        style={{ backgroundColor: '', width: '100%', fontSize: 24 }}
      >
        💾
      </button>
      <p>Save changes</p>

      <Link to="/">
        <button
          className="mt-40 bg-gray"
          style={{ backgroundColor: '', width: '100%', fontSize: 24 }}
        >
          🏠
        </button>
      </Link>
      <p>Go home</p>

      {/* <button
        onClick={handleSaveTemplate}
        aria-label="Save Template"
        title="Save Template"
        className="download-pdf__template_download mt-40"
      />
      <p className="text-small">Save Template</p>

      <label className="download-pdf__template_upload">
        <input type="file" accept=".json,.template" onChange={handleInput} />
      </label>
      <p className="text-small">Upload Template</p> */}

      <button></button>
    </div>
  )
}

export default Download
