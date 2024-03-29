import { FC, PropsWithChildren } from 'react'
import { Page as PdfPage } from '@react-pdf/renderer'
import compose from '../styles/compose'

interface Props {
  className?: string
  pdfMode?: boolean
}

const Page: FC<PropsWithChildren<Props>> = ({ className, pdfMode, children }) => {
  return (
    <>
      {pdfMode ? (
        <PdfPage size="A4" style={compose('page ' + (className ? className : ''))}>
          {children}
        </PdfPage>
      ) : (
        <div className={'page ' + (className ? className : '')}>{children}</div>
      )}
    </>
  )
}

export default Page
