import { Router } from "express";
import { BookController } from "../controllers/book";
import { Database } from "../database/MongoDb";
import { uri } from "../../config";


export const bookRouter = (bookController: BookController) => {
    const router = Router()

    router.get('/', (req, res) => {
        bookController.getAll(req, res);
    });
    router.get('/:id', (req, res) => {
        bookController.getById(req, res);
    });
    router.post('/', (req, res) => {
        bookController.create(req, res);
    });
    router.patch('/:id', (req, res) => {
        bookController.updateById(req, res);
    });
    router.delete('/:id', (req, res) => {
        bookController.delete(req, res);
    });

    return router
};

