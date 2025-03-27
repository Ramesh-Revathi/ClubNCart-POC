import React, { lazy, Suspense } from 'react';

const LazydeliveryModeInCart = lazy(() => import('./deliveryModeInCart'));

const deliveryModeInCart = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazydeliveryModeInCart {...props} />
  </Suspense>
);

export default deliveryModeInCart;
