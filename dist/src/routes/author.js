"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRouter = void 0;
const express_1 = require("express");
const authorRouter = (authorController) => {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => {
        authorController.get(req, res);
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
    return router;
};
exports.authorRouter = authorRouter;
