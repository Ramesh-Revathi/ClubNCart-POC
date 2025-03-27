import React, { lazy, Suspense } from 'react';

const LazypaymentService = lazy(() => import('./paymentService'));

const paymentService = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazypaymentService {...props} />
  </Suspense>
);

export default paymentService;
