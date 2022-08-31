import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const InvoiceList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData({
      url: '/getinvoice'
    })
      .then(d => {
        setList(d)
      })
  }, [])

  const onViewInvoice = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`)
  }

  return (
    <table className='table w-100'>
      <thead>
        <tr className='left'>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Client</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((item, i) => (
            <tr key={i} onClick={() => onViewInvoice(item.invoiceTitle)}>
              <td>{i+1}</td>
              <td>{item?.invoiceTitle}</td>
              <td>{item?.invoiceDate}</td>
              <td>{item?.clientName}</td>
            </tr>))
        }
      </tbody>
    </table>
  )
}

export default InvoiceList;