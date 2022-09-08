/* eslint-disable @typescript-eslint/no-explicit-any */
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';

import {toast} from 'react-toastify';

export default function useGetAllContent(
  props?:
    | Omit<UseQueryOptions<any, unknown, any, string[]>, 'initialData' | 'queryFn' | 'queryKey'> & {
        initialData?: (() => undefined) | undefined;
      }
) {
  const auth = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth');
    } else {
      return null;
    }
  };
  return useQuery(
    ['use-get-all-content'],
    () =>
      axios
        .get('api/contents', {
          headers: {
            Authorization: auth() ? `${JSON.parse(auth() as string).token}` : ''
          }
        })
        .then(() => {
          const contents = localStorage.getItem('contents');

          if (!contents) {
            localStorage.setItem('contents', JSON.stringify([]));
            return [];
          } else {
            return JSON.parse(contents);
          }
        })
        .catch((err: AxiosError<Record<string, string>>) => {
          toast.error(err.response?.data.message);
          throw err;
        }),
    {
      refetchOnWindowFocus: false,
      enabled: !!auth(),
      ...props
    }
  );
}
