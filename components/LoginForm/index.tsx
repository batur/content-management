/* eslint-disable @typescript-eslint/no-misused-promises */
import {Box, TextField, Button} from '@mui/material';
import {useRouter} from 'next/router';
import React, {FC} from 'react';

import {Controller, useForm} from 'react-hook-form';

import {useDispatch} from 'react-redux';
import {AppDispatch} from 'store';
import {login} from 'store/Auth';

const LoginForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const {
    handleSubmit,
    formState: {errors},
    control
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const handleLoginFormSubmit = (data: {username: string; password: string}): void => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        router.push('/');
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        width: '100%',
        maxWidth: (theme) => theme.breakpoints.values.sm / 2
      }}
      component="form"
      onSubmit={handleSubmit(handleLoginFormSubmit)}
    >
      <Controller
        name="username"
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters'
          }
        }}
        control={control}
        render={({fieldState: {error}, field: {value, onChange, onBlur, ref, ...props}}) => (
          <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            {...props}
            fullWidth
            label="Username"
            variant="standard"
            type="text"
            error={error != null}
            helperText={errors?.username?.message}
          />
        )}
      />
      <Controller
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 3,
            message: 'Password must be at least 3 characters'
          }
        }}
        control={control}
        render={({fieldState: {error}, field: {value, onChange, onBlur, ref, ...props}}) => (
          <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            {...props}
            fullWidth
            label="Password"
            variant="standard"
            type="password"
            error={error != null}
            helperText={errors?.password?.message}
          />
        )}
      />
      <Button fullWidth type="submit" variant="contained">
        Log In
      </Button>
    </Box>
  );
};

export default React.memo(LoginForm);
