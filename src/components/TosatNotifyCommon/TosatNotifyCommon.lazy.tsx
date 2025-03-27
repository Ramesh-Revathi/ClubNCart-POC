import React, { lazy, Suspense } from 'react';

const LazyTosatNotifyCommon = lazy(() => import('./TosatNotifyCommon'));

const TosatNotifyCommon = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTosatNotifyCommon {...props} />
  </Suspense>
);

export default TosatNotifyCommon;
