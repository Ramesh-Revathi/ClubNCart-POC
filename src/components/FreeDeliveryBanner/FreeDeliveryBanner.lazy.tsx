import React, { lazy, Suspense } from 'react';

const LazyFreeDeliveryBanner = lazy(() => import('./FreeDeliveryBanner'));

const FreeDeliveryBanner = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFreeDeliveryBanner {...props} />
  </Suspense>
);

export default FreeDeliveryBanner;
