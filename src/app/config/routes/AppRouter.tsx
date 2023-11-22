import { Route, Routes } from 'react-router-dom';

import AuthLayout from '@features/ui/layout/AuthLayout';
import HomePage from '@pages/home';
import LoginPage from '@pages/login';
import NoFoundPage from '@pages/no-found';
import SignUpPage from '@pages/sign-up';

import { AppRoutes } from './AppRoutes';

export default function AppRouter() {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUpPage />} />
        <Route path={AppRoutes.login} element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NoFoundPage />} />
    </Routes>
  );
}
