import React, { lazy, Suspense } from 'react';

const LazyMdNavBar = lazy(() => import('./MdNavBar'));

const MdNavBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMdNavBar {...props} />
  </Suspense>
);

export default MdNavBar;
