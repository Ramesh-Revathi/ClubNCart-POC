import React, { lazy, Suspense } from 'react';

const LazyshopingCartComponent = lazy(() => import('./shopingCartComponent'));

const shopingCartComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyshopingCartComponent {...props} />
  </Suspense>
);

export default shopingCartComponent;
