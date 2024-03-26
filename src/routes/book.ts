import { Router } from "express";
import { BookController } from "../controllers/book";
import { Database } from "../database/MongoDb";
import { uri } from "../../config";


export const bookRouter = (bookController: BookController) => {
    const router = Router()

    router.get('/', bookController.getAll);
    router.get('/:id', bookController.getById);
    router.post('/', bookController.create);
    router.patch('/:id', bookController.updateById);
    router.delete('/:id', bookController.delete);

    return router
};

