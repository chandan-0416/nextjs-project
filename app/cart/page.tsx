import React, { Suspense } from 'react'
import CartPage from './cartDetails'

const page = () => {
  return (
    <Suspense fallback="Cart is loading...">
    <div>
      <CartPage />
    </div>
    </Suspense>
  )
}
export default page;
