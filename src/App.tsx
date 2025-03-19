import MyInvoicePage from './components/MyInvoicePage'
import { Invoice } from './data/types'
import logo from 'images/logoBillly.svg'

function App() {
  const savedInvoice = window.localStorage.getItem('invoiceData')
  let data = null

  try {
    if (savedInvoice) {
      data = JSON.parse(savedInvoice)
    }
  } catch (_e) {}

  const onInvoiceUpdated = (invoice: Invoice) => {
    window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
  }

  return (
    <div className="app bg-black">
      <div className="navbar">
        <div className="navbar__center">
          <img src="/logoBillly.svg" alt="BILLLY Logo" className="navbar__logo" />
        </div>
      </div>
      <h1
        className="center white"
        style={{
          paddingLeft: '8vw',
          paddingRight: '8vw',
          fontSize: '96px',
        }}
      >
        GET PAID WITHOUT PAYING
      </h1>
      <p
        className="center white"
        style={{
          paddingLeft: '8vw',
          paddingRight: '8vw',
          fontSize: '16px',
        }}
      >
        No sign-ups. No complicated dashboards. Just edit your invoice right here, right now and
        download instantly. It’s free, open-source, and built for freelancers & small agencies who
        want less hassle and more time for their actual work.
      </p>
      <div className="edit-button-container">
        <button className="edit-button">edit template</button>
      </div>
      <MyInvoicePage data={data} onChange={onInvoiceUpdated} />
      <footer className="footer">
        <div className="footer__content">
          <span className="footer__text">developed by</span>
          <img src="/LogoDaed.svg" alt="DAED Studios Logo" className="footer__logo" />
        </div>
      </footer>
    </div>
  )
}

export default App
