import { Route, Routes } from 'react-router-dom';

import AuthLayout from '@features/layout/AuthLayout';
import Home from '@pages/home';
import Login from '@pages/login';
import NoFoundPage from '@pages/no-found';
import SignUp from '@pages/sign-up';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="/sighn-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NoFoundPage />} />
    </Routes>
  );
}
