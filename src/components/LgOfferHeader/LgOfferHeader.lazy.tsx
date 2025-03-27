import React, { lazy, Suspense } from 'react';

const LazyLgOfferHeader = lazy(() => import('./LgOfferHeader'));

const LgOfferHeader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLgOfferHeader {...props} />
  </Suspense>
);

export default LgOfferHeader;
