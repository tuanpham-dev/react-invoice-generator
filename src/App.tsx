import React from 'react'
import { HashRouter as Router,Routes, Route } from "react-router-dom";
import AddNewInvoiceScreen from './screens/AddNewInvoiceScreen.jsx';
import Empty from './screens/Empty.jsx';
// import AddNewInvoiceScreen from './screens/AddNewInvoiceScreen';
import HomeScreen from './screens/HomeScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/invoice/:invoiceid" element={<InvoiceScreen />} />
        <Route path="/addnew" element={<AddNewInvoiceScreen/>}/>
      </Routes>
    </Router>
  )
}

export default App
