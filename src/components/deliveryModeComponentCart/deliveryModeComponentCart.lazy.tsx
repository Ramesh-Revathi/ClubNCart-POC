import React, { lazy, Suspense } from 'react';

const LazydeliveryModeComponentCart = lazy(() => import('./deliveryModeComponentCart'));

const deliveryModeComponentCart = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazydeliveryModeComponentCart {...props} />
  </Suspense>
);

export default deliveryModeComponentCart;
