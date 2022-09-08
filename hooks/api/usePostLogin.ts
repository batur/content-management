/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';

import {toast} from 'react-toastify';

export default function usePostLogin(
  props?: Omit<UseMutationOptions<void, unknown, {username: string; password: string}, unknown>, 'mutationFn'>
) {
  return useMutation(
    (data: {username: string; password: string}) =>
      axios
        .post('/api/login', data)
        .then((res: AxiosResponse<Record<string, any>>) => {
          const {data, message} = res.data;

          localStorage.setItem('auth', JSON.stringify(data));
          toast.success(message);
        })
        .catch((err: AxiosError<Record<string, string>>) => {
          toast.error(err.response?.data.message);
          throw err;
        }),
    {
      ...props
    }
  );
}
