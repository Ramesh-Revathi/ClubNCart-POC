import React, { lazy, Suspense } from 'react';

const LazyCustomCtrlNumberInput = lazy(() => import('./CustomCtrlNumberInput'));

const CustomCtrlNumberInput = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCustomCtrlNumberInput {...props} />
  </Suspense>
);

export default CustomCtrlNumberInput;
