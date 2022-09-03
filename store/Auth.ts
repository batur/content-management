import { atom } from 'jotai';

const auth = atom(
  JSON.parse(localStorage.getItem('auth') ?? '{}') as Record<string, string>
);

const AuthAtom = atom(
  (get) => get(auth),
  (get, set, payload: { id: string; token: string; username: string }) => {
    set(auth, payload);
    localStorage.setItem('auth', JSON.stringify(payload));
  }
);

export default AuthAtom;
