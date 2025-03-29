import React, { lazy, Suspense } from 'react';

const LazyFAQs = lazy(() => import('./FAQs'));

const FAQs = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFAQs {...props} />
  </Suspense>
);

export default FAQs;
