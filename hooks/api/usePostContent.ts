/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMutation, useQueryClient, UseMutationOptions} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {isJWTInvalid} from 'helpers';
import {useAtom} from 'jotai';
import {toast} from 'react-toastify';
import AuthAtom from 'store/Auth';

export default function usePostContent(props?: Omit<UseMutationOptions<void, unknown, string, unknown>, 'mutationFn'>) {
  const queryClient = useQueryClient();
  const [auth, setAuth] = useAtom(AuthAtom);

  return useMutation(
    (data: string) =>
      axios
        .post(
          'api/contents',
          {
            content: data,
            createdAt: new Date().toISOString(),
            user: {
              id: auth.id,
              username: auth.username
            }
          },
          {
            headers: {
              Authorization: auth.token
            }
          }
        )
        .then((res: AxiosResponse<Record<string, any>>) => {
          const {message} = res.data;

          const contents = localStorage.getItem('contents');

          if (contents) {
            localStorage.setItem(
              'contents',
              JSON.stringify([
                {
                  content: data,
                  createdAt: new Date().toISOString(),
                  user: {
                    id: auth.id,
                    username: auth.username
                  }
                },
                ...JSON.parse(contents)
              ])
            );
          } else {
            localStorage.setItem(
              'contents',
              JSON.stringify([
                {
                  content: data,
                  createdAt: new Date().toISOString(),
                  user: {
                    id: auth.id,
                    username: auth.username
                  }
                }
              ])
            );
          }
          queryClient.invalidateQueries(['use-get-all-content']);
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
