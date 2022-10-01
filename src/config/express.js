import express, { json, text } from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import cookieParser from 'cookie-parser';

import productRouter from '#Routes/product.routes.js';
import userRouter from '#Routes/user.routes.js';

const expressApp = express();

expressApp.use(cookieParser());
expressApp.use(text());
expressApp.use(json());

const customDirname = dirname(fileURLToPath(import.meta.url));
expressApp.use(express.static(join(customDirname, '../public')));

expressApp.use((req, res, next) => {
  console.log('Middleware to app level');
  next();
});

// The character ? do the before character optional or you can use a regex instead of a string
// expressApp.get('/users?', (_, res) => res.send('Hello users'));
// expressApp.get('/user/:userId', (req, res) =>
//   res.send(`Hello user Nº ${req.params.userId}`)
// );
expressApp.use('/products', productRouter);
expressApp.use('/users', userRouter);

expressApp.use((_, res, next) => {
  res.status(404).send({ errors: ['Endpoint not found'] });
});

export default expressApp;
