import React, { lazy, Suspense } from 'react';

const LazyMdCategoryDisplay = lazy(() => import('./MdCategoryDisplay'));

const MdCategoryDisplay = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMdCategoryDisplay {...props} />
  </Suspense>
);

export default MdCategoryDisplay;
