import React, { lazy, Suspense } from 'react';

const LazyRefundPolicy = lazy(() => import('./RefundPolicy'));

const RefundPolicy = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRefundPolicy {...props} />
  </Suspense>
);

export default RefundPolicy;
