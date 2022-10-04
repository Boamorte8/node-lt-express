import { Router } from 'express';

const userRouter = Router();

const handlerWrapper = (handler) => {
  return async (req, res, next) => {
    try {
      req.log.info('Test log');
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

userRouter.use(
  '/errortest',
  handlerWrapper((req, res, next) => {
    throw new Error('Forced error');
  })
);

userRouter.use((req, res, next) => {
  console.log('Middleware to user Router level');

  // If you sent next with empty params the flow continue in the next middleware
  next();

  // If you sent next with string or an error the flow continue in the error middleware
  // next(new Error('Invalid parameters'));

  // If you sent next with 'route' string the flow continue in the next handler for the same route
  // next('route');
});

userRouter.get(
  '/:id',
  handlerWrapper((req, res, next) => {
    // res can be:
    // sendFile: to send a file to the frontend
    // download: to allow download a file to the user
    // redirect: to redirect the user to a new location
    return res.send(`GET User Nº ${req.params.id}`);

    // This only works if the function is synchronous. NOT for async functions
    // throw new Error('Forced error');
  })
);

userRouter.post(
  '/:id',
  handlerWrapper((req, res, next) => {
    return res.send(`POST User Nº ${req.params.id}`);
  })
);

// userRouter
//   .route('/:id')
//   .get((req, res) => res.send(`GET User Nº ${req.params.id}`))
//   .put((req, res) => res.send(`PUT User Nº ${req.params.id}`))
//   .post((req, res) => res.send(`POST User Nº ${req.params.id}`))
//   .patch((req, res) => res.send(`PATCH User Nº ${req.params.id}`))
//   .delete((req, res) => res.send(`DELETE User Nº ${req.params.id}`));

// userRouter.post('/register', userRegisterDTO, userRegisterController);
// userRouter.patch(
//   '/update-data',
//   userJWTDTO,
//   userUpdateDataDTO,
//   userUpdateDataController
// );

export default userRouter;
