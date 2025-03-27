import React, { lazy, Suspense } from 'react';

const LazyProfilePage = lazy(() => import('./ProfilePage'));

const ProfilePage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProfilePage {...props} />
  </Suspense>
);

export default ProfilePage;
