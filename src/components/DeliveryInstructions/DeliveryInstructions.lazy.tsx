import React, { lazy, Suspense } from 'react';

const LazyDeliveryInstructions = lazy(() => import('./DeliveryInstructions'));

const DeliveryInstructions = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDeliveryInstructions {...props} />
  </Suspense>
);

export default DeliveryInstructions;
