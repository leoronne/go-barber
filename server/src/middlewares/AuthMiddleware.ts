import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenaPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): Response | void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(404).send({ message: 'Authorization is missing' });
    }

    const [, token] = authHeader.split(' ');

    const { secret } = authConfig.jwt;

    try {
      const decoded = verify(token, secret);

      const { sub } = decoded as TokenaPayload;

      req.user = {
        id: sub,
      };

      return next();
    } catch {
      return res.status(404).send({ message: 'Invalid JWT token' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
