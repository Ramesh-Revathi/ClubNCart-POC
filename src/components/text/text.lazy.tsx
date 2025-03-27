import React, { lazy, Suspense } from 'react';

const Lazytext = lazy(() => import('./text'));

const text = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Lazytext {...props} />
  </Suspense>
);

export default text;
