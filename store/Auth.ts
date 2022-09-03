import { atom } from 'jotai';

const auth = atom(
  typeof window !== 'undefined'
    ? (JSON.parse(localStorage.getItem('auth') ?? JSON.stringify({})) as Record<
        string,
        string
      >)
    : {}
);

const AuthAtom = atom(
  (get) => get(auth),
  (get, set, payload: Record<string, string>) => {
    set(auth, payload);
    localStorage.setItem('auth', JSON.stringify(payload));
  }
);

export default AuthAtom;
