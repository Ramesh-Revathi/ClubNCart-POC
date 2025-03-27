import React, { lazy, Suspense } from 'react';

const LazyMdHeader = lazy(() => import('./MdHeader'));

const MdHeader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMdHeader {...props} />
  </Suspense>
);

export default MdHeader;
