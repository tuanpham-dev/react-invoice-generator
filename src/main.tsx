import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './scss/main.scss'
import * as serviceWorker from './serviceWorker'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

serviceWorker.register()
