import React, { FC } from 'react'

interface Props {
  className?: string
  pdfMode?: boolean,
  children?: React.ReactNode
}

const View: FC<Props> = ({ className, pdfMode, children }) => {
  return (
    <div className={'view ' + (className ? className : '')}>{children}</div>
  )
}

export default View
