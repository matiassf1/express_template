"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorController = void 0;
const author_1 = require("../schemas/author");
const pagination_1 = require("../common/pagination");
class AuthorController {
    constructor(authorModel) {
        this.authorModel = authorModel;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paginationDTO = new pagination_1.PaginationDTO();
                const { limit, skip, sort } = paginationDTO.paginate(req.query);
                const searchQuery = paginationDTO.search(req.query);
                const filterParams = { limit, skip, searchQuery, sort };
                const authors = yield this.authorModel.get(filterParams);
                const result = paginationDTO.paginate(req.query);
                result.data = authors;
                return res.json(result);
            }
            catch (error) {
                console.error("Error getting all authors:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const author = yield this.authorModel.getById(id);
                if (!author) {
                    return res.status(404).json({ message: `Author with ${id} ID not found.` });
                }
                return res.json(author);
            }
            catch (error) {
                console.error("Error getting author by id:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, author_1.validateAuthor)(req.body);
                if (!result.success) {
                    return res.status(400).json({ error: result.error });
                }
                const newAuthor = Object.assign({}, result.data);
                const createdAuthor = yield this.authorModel.create(newAuthor);
                return res.status(201).json(createdAuthor);
            }
            catch (error) {
                console.error("Error creating author:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = (0, author_1.validatePartialAuthor)(req.body);
                if (!result.success) {
                    return res.status(400).json({ error: result.error });
                }
                const updatedData = result.data;
                const updatedAuthor = yield this.authorModel.update(id, updatedData);
                if (!updatedAuthor) {
                    return res.status(404).json({ message: 'Author not found' });
                }
                return res.json(updatedAuthor);
            }
            catch (error) {
                console.error("Error updating author:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.authorModel.delete(id);
                return res.json({ message: "Author deleted successfully" });
            }
            catch (error) {
                console.error("Error deleting author:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.AuthorController = AuthorController;
