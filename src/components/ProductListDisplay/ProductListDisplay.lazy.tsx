import React, { lazy, Suspense } from 'react';

const LazyProductListDisplay = lazy(() => import('./ProductListDisplay'));

const ProductListDisplay = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProductListDisplay {...props} />
  </Suspense>
);

export default ProductListDisplay;
