import React, { lazy, Suspense } from 'react';

const LazymainHome = lazy(() => import('./mainHome'));

const mainHome = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazymainHome {...props} />
  </Suspense>
);

export default mainHome;
