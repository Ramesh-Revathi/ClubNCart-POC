import React, { lazy, Suspense } from 'react';

const LazypaymentModeComponent = lazy(() => import('./paymentModeComponent'));

const paymentModeComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazypaymentModeComponent {...props} />
  </Suspense>
);

export default paymentModeComponent;
