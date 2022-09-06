import {atom} from 'jotai';

const AuthAtom = atom(
  () => {
    const auth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
    return auth ? JSON.parse(auth) : null;
  },
  (_get, _set, payload: string | null) => {
    if (payload === null) {
      return;
    } else {
      const parsed = JSON.parse(payload);
      localStorage.setItem('auth', payload);
      return parsed;
    }
  }
);

export default AuthAtom;
