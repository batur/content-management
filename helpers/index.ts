import jwt from 'jsonwebtoken';
import {DateTime} from 'luxon';

export const isJWTInvalid = (token: string): boolean => {
  const decoded = jwt.decode(token);
  if (decoded) {
    const {exp} = decoded as {exp: number};
    return Date.now() >= exp * 1000;
  }
  return true;
};

export function isJWTExpired(exp: number): boolean {
  return DateTime.fromSeconds(exp) > DateTime.local();
}

export function isJWTValid(token: string | null): boolean {
  try {
    const decoded = jwt.decode(token);

    return isJWTExpired(decoded.exp);
  } catch (e) {
    console.error(e);

    return false;
  }
}

export const formatDate = (date: string): string => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
};
