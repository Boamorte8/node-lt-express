import { Router } from 'express';

const userRouter = Router();

userRouter.get('/:id', (req, res) => {
  // res can be:
  // sendFile: to send a file to the frontend
  // download: to allow download a file to the user
  // redirect: to redirect the user to a new location
  return res.send(`GET User Nº ${req.params.id}`);
});

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
