import React, { lazy, Suspense } from 'react';

const LazyAddressBook = lazy(() => import('./AddressBook'));

const AddressBook = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddressBook {...props} />
  </Suspense>
);

export default AddressBook;
