/* eslint-disable import/no-anonymous-default-export */
import type {NextApiRequest, NextApiResponse} from 'next';

import {isJWTInvalid} from 'helpers';

export default function (req: NextApiRequest, res: NextApiResponse): void {
  const {authorization} = req.headers;

  if (!authorization || isJWTInvalid(authorization)) {
    res.status(401).json({
      message: `Unauthorized`
    });
  }

  /*
   * Do something with the request body
   */

  res.status(200).json({
    message: req.method === 'POST' ? 'Content created successfully' : 'Content fetched successfully'
  });
}
