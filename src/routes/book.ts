import { Router } from "express";
import { BookController } from "../controllers/book";


export const bookRouter = Router();

bookRouter.get('/', BookController.getAll);

bookRouter.get('/:id', BookController.getById);

bookRouter.post('/', BookController.create);

bookRouter.patch('/:id', BookController.updateById);

bookRouter.delete('/:id', BookController.delete);