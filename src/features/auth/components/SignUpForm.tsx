import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { Box, Link, Stack, TextField, Typography } from '@mui/material';

import { AppRoutes } from '@config/routes';
import AppButton from '@features/ui/AppButton';

interface FormInput {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

function SignUpForm() {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%' }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Please specify your name!' }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />

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
            label="Email address"
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
              mb: 3,
              mt: 0,
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="passwordRepeat"
        control={control}
        rules={{ required: 'Please specify your password confirmation!' }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="passwordRepeat"
            label="Confirm Password"
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
        Sign-Up
      </AppButton>

      <Stack
        direction="row"
        spacing={0.5}
        sx={{ width: ' 100%', alignItems: 'center' }}
      >
        <Typography color="text.secondary">
          Do you have an account already?
        </Typography>
        <Link href={AppRoutes.login} variant="body2">
          Login
        </Link>
      </Stack>
    </Box>
  );
}

export default SignUpForm;
