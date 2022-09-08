import type {RootState} from 'store';
import {logout} from 'store/Auth';
import {useEffect, createContext, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isJWTValid} from 'helpers';
import {useRouter} from 'next/router';

const AuthContext = createContext({
  token: null,
  id: null,
  username: null
});

export const ProvideAuth = ({children}: {children: React.ReactNode}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state: RootState) => state.AuthSlice);

  useEffect(() => {
    if (auth.token && !isJWTValid(auth.token)) {
      router.push('/');
    } else {
      dispatch(logout());
      router.push('/login');
    }
  }, [auth]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const useProvideAuth = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.AuthSlice);

  function logOut(): void {
    dispatch(logout());
  }

  return {logOut, auth};
};
