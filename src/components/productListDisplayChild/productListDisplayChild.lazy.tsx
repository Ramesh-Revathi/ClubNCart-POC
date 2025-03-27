import React, { lazy, Suspense } from 'react';

const LazyproductListDisplayChild = lazy(() => import('./productListDisplayChild'));

const productListDisplayChild = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyproductListDisplayChild {...props} />
  </Suspense>
);

export default productListDisplayChild;
