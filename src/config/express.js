import cookieParser from 'cookie-parser';
import express, { json } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import feedRouter from '#Routes/feed.routes.js';
import productRouter from '#Routes/product.routes.js';
import userRouter from '#Routes/user.routes.js';
import httpLogger from './logger.js';

const expressApp = express();

// Express configuration
const customDirname = dirname(fileURLToPath(import.meta.url));
expressApp.use('/public', express.static(join(customDirname, '../../public')));

expressApp.set('view engine', 'ejs');
expressApp.set('views', join(customDirname, '../../views'));

// Application middlewares
expressApp.use(cookieParser());
// expressApp.use(text());
expressApp.use(json());

expressApp.use((req, res, next) => {
  // console.log('Middleware to app level');
  // One option it's implement a logger here
  // myLogger(req)
  // Libraries that help you with logging are: winston, morgan, and pino
  // pino-http is an implementation of pino focused on http logging
  httpLogger(req, res);
  next();
});

// To handle CORS requests errors
expressApp.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PUT; PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Template
expressApp.get('/index/:name', (req, res) => {
  return res.render('index.ejs', {
    name: req.params.name,
  });
});

// Routers
// The character ? do the before character optional or you can use a regex instead of a string
// expressApp.get('/users?', (_, res) => res.send('Hello users'));
// expressApp.get('/user/:userId', (req, res) =>
//   res.send(`Hello user Nº ${req.params.userId}`)
// );
expressApp.use('/products', productRouter);
expressApp.use('/users', userRouter);
expressApp.use('/feed', feedRouter);

// Error middleware
expressApp.use((err, req, res, next) => {
  res.err = {
    message: err.message,
    stack: err.stack,
  };
  next(err);
});

expressApp.use((err, req, res, next) => {
  return res
    .status(404)
    .send({ errors: [err.message || 'Endpoint not found'] });
});

export default expressApp;
