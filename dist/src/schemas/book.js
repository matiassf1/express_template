"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialBook = exports.validateBook = exports.BookSchema = void 0;
const zod_1 = require("zod");
exports.BookSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    year: zod_1.z.number(),
    isbn: zod_1.z.string(),
    publisher: zod_1.z.string(),
});
function validateBook(input) {
    return exports.BookSchema.safeParse(input);
}
exports.validateBook = validateBook;
function validatePartialBook(input) {
    return exports.BookSchema.partial().safeParse(input);
}
exports.validatePartialBook = validatePartialBook;
