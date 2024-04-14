import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logout, userLoaded } from '@features/auth/store/authSlice';
import { auth } from '@services/firebase';

export const useAuthStateSubscription = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          userLoaded({
            displayName: user.displayName,
            uid: user.uid,
            email: user.email ?? '',
          }),
        );
      } else {
        dispatch(logout());
      }
    });
  });
};
