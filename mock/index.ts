import bcrypt from 'bcryptjs';

const USERS = [
  {
    id: '1',
    username: 'admin',
    password: bcrypt.hashSync('admin', 10)
  },
  {
    id: '2',
    username: 'batur',
    password: bcrypt.hashSync('akkurt', 10)
  },
  {
    id: '3',
    username: 'ufuk',
    password: bcrypt.hashSync('yaşar', 10)
  },
  {
    id: '4',
    username: 'natro',
    password: bcrypt.hashSync('hosting', 10)
  }
];

export default USERS;
