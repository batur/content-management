import jwt from 'jsonwebtoken';

export const isJWTInvalid = (token: string): boolean => {
  const decoded = jwt.decode(token);
  if (decoded) {
    const {exp} = decoded as {exp: number};
    return Date.now() >= exp * 1000;
  }
  return true;
};
