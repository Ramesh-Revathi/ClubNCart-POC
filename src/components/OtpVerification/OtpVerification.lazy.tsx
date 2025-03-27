import React, { lazy, Suspense } from 'react';

const LazyOtpVerification = lazy(() => import('./OtpVerification'));

const OtpVerification = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyOtpVerification {...props} />
  </Suspense>
);

export default OtpVerification;
