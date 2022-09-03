/* eslint-disable @typescript-eslint/no-unsafe-call */
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const USERS = [
  {
    id: uuidv4() as string,
    username: 'admin',
    password: bcrypt.hashSync('admin', 10),
  },
  {
    id: uuidv4() as string,
    username: 'batur',
    password: bcrypt.hashSync('akkurt', 10),
  },
  {
    id: uuidv4() as string,
    username: 'ufuk',
    password: bcrypt.hashSync('yaşar', 10),
  },
  {
    id: uuidv4() as string,
    username: 'natro',
    password: bcrypt.hashSync('hosting', 10),
  },
];

export default USERS;
