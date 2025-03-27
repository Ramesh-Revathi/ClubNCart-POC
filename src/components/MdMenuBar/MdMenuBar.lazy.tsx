import React, { lazy, Suspense } from 'react';

const LazyMdMenuBar = lazy(() => import('./MdMenuBar'));

const MdMenuBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMdMenuBar {...props} />
  </Suspense>
);

export default MdMenuBar;
