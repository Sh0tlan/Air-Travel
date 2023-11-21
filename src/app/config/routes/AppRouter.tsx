import { Route, Routes } from 'react-router-dom';

import AuthLayout from '@features/layout/AuthLayout';
import HomePage from '@pages/home';
import LoginPage from '@pages/login';
import NoFoundPage from '@pages/no-found';
import SignUpPage from '@pages/sign-up';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path="/sighn-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NoFoundPage />} />
    </Routes>
  );
}
