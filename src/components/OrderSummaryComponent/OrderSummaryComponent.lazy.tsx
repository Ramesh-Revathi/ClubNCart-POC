import React, { lazy, Suspense } from 'react';

const LazyOrderSummaryComponent = lazy(() => import('./OrderSummaryComponent'));

const OrderSummaryComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOrderSummaryComponent {...props} />
  </Suspense>
);

export default OrderSummaryComponent;
