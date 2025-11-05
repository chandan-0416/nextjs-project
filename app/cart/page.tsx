// import React, { Suspense } from 'react'
// import CartPage from './cartDetails'
// import CartSkeleton from './cartSkelton';

// const page = () => {
//   return (
//     <Suspense fallback= {<CartSkeleton />}>
//     <div>
//       <CartPage />
//     </div>
//     </Suspense>
//   )
// }
// export default page;

import React, { Suspense } from "react";
import CartSuspenseWrapper from "./CartSuspenseWrapper";
import CartSkeleton from "./cartSkelton";

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <Suspense key="cart-suspense" fallback={<CartSkeleton />}>
        <CartSuspenseWrapper />
      </Suspense>
    </div>
  );
}