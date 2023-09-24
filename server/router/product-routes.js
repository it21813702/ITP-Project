import { Router } from 'express';
const userRouter = Router();

import * as productController from '../controllers/product-controller.js';

userRouter.get('/', productController.getAllProducts);
userRouter.post('/', productController.addProduct);
userRouter.get('/:id', productController.getById);
userRouter.put('/:id', productController.updateProduct);
userRouter.delete('/:id', productController.deleteProduct);

export default userRouter;
