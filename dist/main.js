"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_1 = require("./routes/author");
const book_1 = require("./routes/book");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/books', book_1.bookRouter);
app.use('/authors', author_1.authorRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
