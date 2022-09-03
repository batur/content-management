/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import USERS from 'mock';

export default function (req: NextApiRequest, res: NextApiResponse): void {
  const {
    username,
    password,
  }: {
    username: string;
    password: string;
  } = req.body as { username: string; password: string };
  if (req.method !== 'POST') {
    res.status(400).json('Error');
  }
  const user = USERS.find((user) => user.username === username);

  if (user == null) {
    res.status(400).json({
      message: 'Username or password is incorrect',
    });
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(400).json({
        message: 'Username or password is incorrect',
      });
    } else {
      res.status(200).json({
        message: 'Login successful',
        token: jwt.sign({ user }, 'secret', {
          expiresIn: 86400, // 24 hours
        }),
      });
    }
  }
}
