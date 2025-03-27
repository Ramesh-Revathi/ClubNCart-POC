import React, { lazy, Suspense } from 'react';

const LazyproductSearchComponent = lazy(() => import('./productSearchComponent'));

const productSearchComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyproductSearchComponent {...props} />
  </Suspense>
);

export default productSearchComponent;
