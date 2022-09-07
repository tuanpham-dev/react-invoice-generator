import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import { getData } from '../utils/fetchdataFirebase';

const InvoiceList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    // fetchData({
    //   url: '/getinvoice'
    // })
    //   .then(d => {
    //     setList(d)
    //   })
    getData().then((d)=>{

      setList(d);
    })
  }, [])

  const onViewInvoice = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`)
  }

  const onAddInvoice = ()=>{
    navigate('/addnew');
  }

  return (
    <div>
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
            <tr key={i} onClick={() => {
              console.log("[id 😄] ",item.id)
              onViewInvoice(item.id)}}>
              <td>{i+1}</td>
              <td>{item?.invoiceTitle}</td>
              <td>{item?.invoiceDate}</td>
              <td>{item?.clientName}</td>
            </tr>))
        }
      </tbody>
    </table>
    <button id='btn_outline' onClick={onAddInvoice}>Add</button></div>
  )
}

export default InvoiceList;