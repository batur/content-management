/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useSetAtom } from 'jotai';
import { toast } from 'react-toastify';

import AuthAtom from 'store/Auth';

export default function usePostLogin() {
  const setAuthAtom = useSetAtom(AuthAtom);
  return useMutation(async (data: { username: string; password: string }) => {
    return await axios
      .post('/api/login', data)
      .then((res: AxiosResponse<Record<string, string>>) => {
        const { token, message } = res.data;

        setAuthAtom(token);
        toast.success(message);
      })
      .catch((err: AxiosError<Record<string, string>>) => {
        toast.error(err.response?.data.message);
        setAuthAtom('');
      });
  });
}
