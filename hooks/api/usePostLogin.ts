/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {useSetAtom} from 'jotai';
import {toast} from 'react-toastify';

import AuthAtom from 'store/Auth';

export default function usePostLogin(props: any) {
  const setAuthAtom = useSetAtom(AuthAtom);
  return useMutation(
    (data: {username: string; password: string}) =>
      axios
        .post('/api/login', data)
        .then((res: AxiosResponse<Record<string, any>>) => {
          const {data, message} = res.data;

          setAuthAtom(JSON.stringify(data));
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
