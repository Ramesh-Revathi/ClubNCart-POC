import React, { lazy, Suspense } from 'react';

const LazyMdCategoryScroller = lazy(() => import('./MdCategoryScroller'));

const MdCategoryScroller = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMdCategoryScroller {...props} />
  </Suspense>
);

export default MdCategoryScroller;
