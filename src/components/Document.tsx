import { FC, PropsWithChildren } from 'react'
import { Document as PdfDocument } from '@react-pdf/renderer'

interface Props {
  pdfMode?: boolean
}

const Document: FC<PropsWithChildren<Props>> = ({ pdfMode, children }) => {
  return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</>
}

export default Document
