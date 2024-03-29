import { FC } from 'react'
import { Text as PdfText } from '@react-pdf/renderer'
import compose from '../styles/compose'

interface Props {
  className?: string
  pdfMode?: boolean
  children?: string
}

const Text: FC<Props> = ({ className, pdfMode, children }) => {
  return (
    <>
      {pdfMode ? (
        <PdfText style={compose('span ' + (className ? className : ''))}>{children}</PdfText>
      ) : (
        <span className={'span ' + (className ? className : '')}>{children}</span>
      )}
    </>
  )
}

export default Text
