import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import * as serviceWorker from './serviceWorker'
import OverviewPage from './pages/Overviewpage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InvoiceEditorPage from './pages/InvoiceEditorPage.tsx'
import CreateNewInvoicePage from './pages/CreateNewInvoicePage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <OverviewPage />,
  },
  {
    path: '/invoices/:id',
    element: <InvoiceEditorPage />,
  },
  {
    path: '/new-invoice',
    element: <CreateNewInvoicePage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

serviceWorker.register()
