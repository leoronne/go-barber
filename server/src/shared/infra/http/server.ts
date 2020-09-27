import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import ora from 'ora';
import cors from 'cors';
import { errors } from 'celebrate';
import path from 'path';
import AppError from '@shared/errors/AppError';

import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/database';
import '@shared/container';

import routes from './routes';

require('dotenv/config');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(rateLimiter);

app.use(routes);

app.use(errors());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
