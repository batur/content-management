/* eslint-disable @typescript-eslint/no-explicit-any */
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {isJWTInvalid} from 'helpers';
import {useAtom} from 'jotai';
import {toast} from 'react-toastify';
import AuthAtom from 'store/Auth';

export default function useGetAllContent(
  props?:
    | Omit<UseQueryOptions<any, unknown, any, string[]>, 'initialData' | 'queryFn' | 'queryKey'> & {
        initialData?: (() => undefined) | undefined;
      }
) {
  const [auth, setAuth] = useAtom(AuthAtom);

  return useQuery(
    ['use-get-all-content'],
    () =>
      axios
        .get('api/contents', {
          headers: {
            Authorization: auth.token
          }
        })
        .then(() => {
          const contents = localStorage.getItem('contents');

          if (contents) {
            return JSON.parse(contents) as Contents[];
          } else {
            localStorage.setItem('contents', JSON.stringify([]));
            return [];
          }
        })
        .catch((err: AxiosError<Record<string, string>>) => {
          isJWTInvalid(auth.token) && setAuth(null);
          toast.error(err.response?.data.message);
          throw err;
        }),
    {
      refetchOnWindowFocus: false,
      ...props
    }
  );
}
