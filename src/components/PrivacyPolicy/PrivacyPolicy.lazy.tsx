import React, { lazy, Suspense } from 'react';

const LazyPrivacyPolicy = lazy(() => import('./PrivacyPolicy'));

const PrivacyPolicy = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPrivacyPolicy {...props} />
  </Suspense>
);

export default PrivacyPolicy;
