"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const bookRouter = (bookController) => {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => {
        bookController.get(req, res);
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
    return router;
};
exports.bookRouter = bookRouter;
