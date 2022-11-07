import { Router } from 'express';

import {
  userRegisterBodyDTO,
  userRegisterParamsDTO,
} from '#DTOs/user-register.dto.js';
import handlerWrapper from '#Lib/handler-wrapper.js';
import UserRegisterService from '#Services/user-register.service.js';

const userRouter = Router();

userRouter.use(
  '/errortest',
  handlerWrapper((req, res, next) => {
    throw new Error('Forced error');
  })
);

// userRouter.use((req, res, next) => {
//   console.log('Middleware to user Router level');

//   // If you sent next with empty params the flow continue in the next middleware
//   next();

//   // If you sent next with string or an error the flow continue in the error middleware
//   // next(new Error('Invalid parameters'));

//   // If you sent next with 'route' string the flow continue in the next handler for the same route
//   // next('route');
// });

userRouter.get(
  '/:id',
  handlerWrapper((req, res, next) => {
    // res can be:
    // sendFile: to send a file to the frontend
    // download: to allow download a file to the user
    // redirect: to redirect the user to a new location
    req.log.info(`GET User Nº ${req.params.id}`);
    return res.send(`GET User Nº ${req.params.id}`);

    // This only works if the function is synchronous. NOT for async functions
    // throw new Error('Forced error');
  })
);

userRouter.post(
  '/register/:id',
  userRegisterParamsDTO,
  userRegisterBodyDTO,
  handlerWrapper((req, res, next) => {
    UserRegisterService(req.body);
    req.log.info(`POST User Nº ${req.params.id}`);
    return res.send(`POST User Nº ${req.params.id}`);
  })
);

export default userRouter;
