import BarcodeScanner from '@/components/BarcodeScanner'
import Header from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header heading='Scan Tickets' />

      <BarcodeScanner/>

    </div>
  )
}

export default page