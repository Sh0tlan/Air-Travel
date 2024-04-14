import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { Box, Link, Stack, TextField, Typography } from '@mui/material';

import { AppRoutes } from '@config/routes';
import AppButton from '@features/ui/AppButton';
import { useAppDispatch, useAppSelector } from '@store/index';

import { loginUser } from '../store/AuthActions';
import { selectUser } from '../store/authSlice';

interface FormInput {
  email: string;
  password: string;
}

function LoginForm() {
  const user = useAppSelector(selectUser);
  const { handleSubmit, control, onSubmit } = useLoginForm();

  if (user) {
    return <Navigate to={AppRoutes.dashboard} />;
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%' }}
    >
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Please specify email address!' }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: 'Please specify your password!' }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            autoComplete="current-password"
            type="password"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{
              mb: {
                xs: 3,
                md: 5,
              },
              mt: 0,
            }}
            {...field}
          />
        )}
      />

      <AppButton type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
        Login
      </AppButton>

      <Stack
        direction="row"
        spacing={0.5}
        sx={{ width: ' 100%', alignItems: 'center' }}
      >
        <Typography color="text.secondary">
          Don't have an accont yet?
        </Typography>
        <Link href={AppRoutes.signUp} variant="body2">
          Sign Up
        </Link>
      </Stack>
    </Box>
  );
}

export default LoginForm;

export function useLoginForm() {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      }),
    ).unwrap();
  };

  return {
    handleSubmit,
    control,
    onSubmit,
  };
}
