import { atom } from 'jotai';

const auth = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('auth') ?? JSON.stringify({})
    : ''
);

const AuthAtom = atom(
  (get) => get(auth),
  (get, set, payload: string) => {
    set(auth, payload);
    localStorage.setItem('auth', payload);
  }
);

export default AuthAtom;
