import React, { lazy, Suspense } from 'react';

const LazytransactionSummary = lazy(() => import('./transactionSummary'));

const transactionSummary = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazytransactionSummary {...props} />
  </Suspense>
);

export default transactionSummary;
