import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(req: Request, res: Response, next: NextFunction): Response | void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(404).send({ message: 'Authorization is missing' });
    }

    const [, token] = authHeader.split(' ');

    const { secret } = authConfig;

    try {
      const decoded = verify(token, secret);

      const { sub } = decoded as ITokenPayload;

      req.user = {
        id: sub,
      };

      return next();
    } catch {
      return res.status(404).send({ message: 'Invalid token' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
