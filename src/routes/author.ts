import { Router } from "express";
import { AuthorController } from "../controllers/author";

export const authorRouter = (authorController: AuthorController) => {
    const router = Router()

    router.get('/', (req, res) => {
        authorController.getAll(req, res);
    });
    router.get('/:id', (req, res) => {
        authorController.getById(req, res);
    });
    router.post('/', (req, res) => {
        authorController.create(req, res);
    });
    router.patch('/:id', (req, res) => {
        authorController.updateById(req, res);
    });
    router.delete('/:id', (req, res) => {
        authorController.delete(req, res);
    });

    return router
};