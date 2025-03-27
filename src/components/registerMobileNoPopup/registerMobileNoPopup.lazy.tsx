import React, { lazy, Suspense } from 'react';

const LazyregisterMobileNoPopup = lazy(() => import('./registerMobileNoPopup'));

const registerMobileNoPopup = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyregisterMobileNoPopup {...props} />
  </Suspense>
);

export default registerMobileNoPopup;
