"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const bookRouter = (bookController) => {
    const router = (0, express_1.Router)();
    router.get('/', bookController.getAll);
    router.get('/:id', bookController.getById);
    router.post('/', bookController.create);
    router.patch('/:id', bookController.updateById);
    router.delete('/:id', bookController.delete);
    return router;
};
exports.bookRouter = bookRouter;
