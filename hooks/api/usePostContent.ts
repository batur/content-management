/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {isJWTInvalid} from 'helpers';
import {useAtom} from 'jotai';
import {toast} from 'react-toastify';
import AuthAtom from 'store/Auth';

export default function usePostContent(props?: any) {
  const [auth, setAuth] = useAtom(AuthAtom);

  return useMutation(
    (data: string) =>
      axios
        .post(
          'api/contents',
          {
            data,
            createdAt: new Date().toISOString(),
            user: {
              id: auth.id,
              username: auth.username
            }
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        )
        .then((res: AxiosResponse<Record<string, any>>) => {
          const {message} = res.data;
          toast.success(message);
        })
        .catch((err: AxiosError<Record<string, string>>) => {
          isJWTInvalid(auth.token) && setAuth(null);
          toast.error(err.response?.data.message);
          throw err;
        }),
    {
      ...props
    }
  );
}
