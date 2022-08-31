import React, { FC, useEffect, useState } from 'react'
import { Invoice } from '../data/types'

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

  const printPage = () => {
    window?.print();
  }

  return (
    <div className={'download-pdf ' + (!show ? 'loading' : '')} title="Save PDF">
      {show && (
        <a onClick={() => printPage()} />
      )}
    </div>
  )
}

export default Download
