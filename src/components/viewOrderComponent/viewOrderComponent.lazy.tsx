import React, { lazy, Suspense } from 'react';

const LazyviewOrderComponent = lazy(() => import('./viewOrderComponent'));

const viewOrderComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyviewOrderComponent {...props} />
  </Suspense>
);

export default viewOrderComponent;
