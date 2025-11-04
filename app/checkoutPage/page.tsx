import React, { Suspense } from 'react'
import CheckoutPage from './checkoutDetails'

const page = () => {
  return (
    <Suspense fallback="Data is comming....">
    <div>
      <CheckoutPage />
    </div>
    </Suspense>
  )
}

export default page;
