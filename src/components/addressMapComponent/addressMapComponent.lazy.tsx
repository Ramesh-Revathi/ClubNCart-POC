import React, { lazy, Suspense } from 'react';

const LazyaddressMapComponent = lazy(() => import('./addressMapComponent'));

const addressMapComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyaddressMapComponent {...props} />
  </Suspense>
);

export default addressMapComponent;
