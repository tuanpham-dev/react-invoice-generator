import React, { FC } from 'react'

interface Props {
  className?: string
  pdfMode?: boolean
  children?: string
}

const Text: FC<Props> = ({ className, pdfMode, children }) => {
  return (
    <span className={'span ' + (className ? className : '')}>{children}</span>
  )
}

export default Text
