import { Navigate } from 'react-router-dom';

import { AppRoutes } from '@config/routes';
import { selectAuth } from '@features/auth/store/authSlice';
import Loader from '@features/ui/Loader';
import { useAppSelector } from '@store/index';

interface Props {
  children: JSX.Element;
}

export default function GuestRoute({ children }: Props) {
  const auth = useAppSelector(selectAuth);

  if (auth.status === 'loading' || auth.status === 'idle') {
    return <Loader />;
  }

  if (auth.user) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  return children;
}
