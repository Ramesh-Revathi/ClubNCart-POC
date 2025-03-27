import React, { lazy, Suspense } from 'react';

const LazyAppFooterSection = lazy(() => import('./AppFooterSection'));

const AppFooterSection = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAppFooterSection {...props} />
  </Suspense>
);

export default AppFooterSection;
