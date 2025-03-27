import React, { lazy, Suspense } from 'react';

const LazyLgNavBar = lazy(() => import('./LgNavBar'));

const LgNavBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLgNavBar {...props} />
  </Suspense>
);

export default LgNavBar;
