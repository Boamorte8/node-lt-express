import { Router } from 'express';

const productRouter = Router();

productRouter
  .route('/:id')
  .get((req, res) => res.send(`GET Product Nº ${req.params.id}`))
  .put((req, res) => res.send(`PUT Product Nº ${req.params.id}`))
  .post((req, res) => res.send(`POST Product Nº ${req.params.id}`))
  .patch((req, res) => res.send(`PATCH Product Nº ${req.params.id}`))
  .delete((req, res) => res.send(`DELETE Product Nº ${req.params.id}`));

export default productRouter;
