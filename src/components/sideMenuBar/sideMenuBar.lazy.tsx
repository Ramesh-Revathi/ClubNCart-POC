import React, { lazy, Suspense } from 'react';

const LazysideMenuBar = lazy(() => import('./sideMenuBar'));

const sideMenuBar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazysideMenuBar {...props} />
  </Suspense>
);

export default sideMenuBar;
