"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialAuthor = exports.validateAuthor = exports.AuthorSchema = void 0;
const zod_1 = require("zod");
exports.AuthorSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    birth_date: zod_1.z.string(),
    nationality: zod_1.z.string(),
    famous_works: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string(),
        year: zod_1.z.number(),
    })),
});
function validateAuthor(input) {
    return exports.AuthorSchema.safeParse(input);
}
exports.validateAuthor = validateAuthor;
function validatePartialAuthor(input) {
    return exports.AuthorSchema.partial().safeParse(input);
}
exports.validatePartialAuthor = validatePartialAuthor;
