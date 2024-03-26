import { Router } from "express";
import { BookController } from "../controllers/book";
import { Database } from "../database/MongoDb";
import { uri } from "../../config";


export const bookRouter = Router();

const bookController = new BookController(new Database(uri));

bookRouter.get('/', bookController.getAll);

bookRouter.get('/:id', bookController.getById);

bookRouter.post('/', bookController.create);

bookRouter.patch('/:id', bookController.updateById);

bookRouter.delete('/:id', bookController.delete);