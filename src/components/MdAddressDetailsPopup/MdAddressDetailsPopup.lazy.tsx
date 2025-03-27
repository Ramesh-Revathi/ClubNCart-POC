import React, { lazy, Suspense } from 'react';

const LazyMdAddressDetailsPopup = lazy(() => import('./MdAddressDetailsPopup'));

const MdAddressDetailsPopup = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMdAddressDetailsPopup {...props} />
  </Suspense>
);

export default MdAddressDetailsPopup;
