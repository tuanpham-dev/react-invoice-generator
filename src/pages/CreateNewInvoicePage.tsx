import InvoicePage from '../components/InvoicePage'
import { initialInvoice } from '../data/initialData'
import { v4 as uuidv4 } from 'uuid'

import '../scss/main.scss'

const CreateNewInvoicePage = () => {
  const id = uuidv4()

  return (
    <div className="app">
      <InvoicePage data={initialInvoice} id={id} />
    </div>
  )
}

export default CreateNewInvoicePage
