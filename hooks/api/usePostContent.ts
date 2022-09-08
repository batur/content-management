/* eslint-disable @typescript-eslint/no-explicit-any */
import {useMutation, useQueryClient, UseMutationOptions} from '@tanstack/react-query';
import axios, {AxiosError, AxiosResponse} from 'axios';

import {v4 as uuidv4} from 'uuid';

import {toast} from 'react-toastify';

export default function usePostContent(props?: Omit<UseMutationOptions<void, unknown, string, unknown>, 'mutationFn'>) {
  const queryClient = useQueryClient();

  const auth = localStorage.getItem('auth');
  return useMutation(
    (data: string) =>
      axios
        .post(
          'api/contents',
          {},
          {
            headers: {
              Authorization: auth ? ` ${JSON.parse(auth).token}` : ''
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
                  id: uuidv4(),
                  content: data,
                  createdAt: new Date().toISOString(),
                  user: {
                    id: auth && JSON.parse(auth).id,
                    username: auth && JSON.parse(auth).username
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
                  id: uuidv4(),
                  content: data,
                  createdAt: new Date().toISOString(),
                  user: {
                    id: auth && JSON.parse(auth).id,
                    username: auth && JSON.parse(auth).username
                  }
                }
              ])
            );
          }
          queryClient.invalidateQueries(['use-get-all-content']);
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
