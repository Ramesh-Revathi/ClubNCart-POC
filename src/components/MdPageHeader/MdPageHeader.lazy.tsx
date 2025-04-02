import React, { lazy, Suspense } from 'react';

const LazyMdPageHeader = lazy(() => import('./MdPageHeader'));

const MdPageHeader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMdPageHeader {...props} />
  </Suspense>
);

export default MdPageHeader;
