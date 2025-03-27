import React, { lazy, Suspense } from 'react';

const LazyViewCartAtBottom = lazy(() => import('./ViewCartAtBottom'));

const ViewCartAtBottom = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyViewCartAtBottom {...props} />
  </Suspense>
);

export default ViewCartAtBottom;
