import React, { lazy, Suspense } from 'react';

const LazyaddressMap = lazy(() => import('./addressMap'));

const addressMap = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyaddressMap {...props} />
  </Suspense>
);

export default addressMap;
