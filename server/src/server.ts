import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import path from 'path';

import './database';

import routes from './routes';

require('dotenv/config');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

const PORT = process.env.PORT || 8080;
app.listen(PORT);
