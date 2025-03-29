import React, { lazy, Suspense } from 'react';

const LazyTermsOfUse = lazy(() => import('./TermsOfUse'));

const TermsOfUse = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTermsOfUse {...props} />
  </Suspense>
);

export default TermsOfUse;
