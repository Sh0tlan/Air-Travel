import { SnackbarMessage, enqueueSnackbar } from 'notistack';

import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const snackbarPayload = action.payload as SnackbarMessage;
    enqueueSnackbar(snackbarPayload, {
      variant: 'error',
    });
  }

  return next(action);
};
