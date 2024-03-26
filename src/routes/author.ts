import { Router } from "express";
import { AuthorController } from "../controllers/author";


export const authorRouter = Router();

authorRouter.get('/', AuthorController.getAll);

authorRouter.get('/:id', AuthorController.getById);

authorRouter.post('/', AuthorController.create);

authorRouter.patch('/:id', AuthorController.updateById);

authorRouter.delete('/:id', AuthorController.delete);