import React, { lazy, Suspense } from 'react';

const LazyotpComponent = lazy(() => import('./otpComponent'));

const otpComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyotpComponent {...props} />
  </Suspense>
);

export default otpComponent;
