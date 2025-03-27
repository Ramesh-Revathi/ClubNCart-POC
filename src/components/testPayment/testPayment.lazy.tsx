import React, { lazy, Suspense } from 'react';

const LazytestPayment = lazy(() => import('./testPayment'));

const testPayment = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazytestPayment {...props} />
  </Suspense>
);

export default testPayment;
