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
exports.AuthorMongoModel = void 0;
const mongodb_1 = require("mongodb");
class AuthorMongoModel {
    constructor(authorsDb) {
        this.authorCollection = authorsDb.getDb().collection('authors');
    }
    get(filterParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {
                    $or: [
                        { name: { $regex: filterParams.searchQuery, $options: 'i' } },
                        { 'famous_works.title': { $regex: filterParams.searchQuery, $options: 'i' } }
                    ]
                };
                const sort = filterParams.sort.length > 0 ? filterParams.sort : 'name';
                const authors = yield this.authorCollection.find(query)
                    .skip(filterParams.skip)
                    .limit(filterParams.limit)
                    .sort(sort)
                    .toArray();
                const authorsMapped = authors.map((author) => this.mapAuthorFromDatabase(author));
                return authorsMapped;
            }
            catch (error) {
                console.error("Error getting all authors:", error);
                throw new Error("Failed to retrieve authors");
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield this.authorCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
                return author ? this.mapAuthorFromDatabase(author) : null;
            }
            catch (error) {
                console.error("Error getting author by id:", error);
                throw new Error("Failed to retrieve author");
            }
        });
    }
    create(author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authorCollection.insertOne(author);
                return author;
            }
            catch (error) {
                console.error("Error creating author:", error);
                throw new Error("Failed to create author");
            }
        });
    }
    update(id, updatedAuthor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield this.getById(id);
                if (!author) {
                    throw new Error("Author not found");
                }
                const mergedAuthor = Object.assign(Object.assign({}, author), updatedAuthor);
                yield this.authorCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: mergedAuthor });
                return mergedAuthor;
            }
            catch (error) {
                console.error("Error updating author:", error);
                throw new Error("Failed to update author");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authorCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            }
            catch (error) {
                console.error("Error deleting author:", error);
                throw new Error("Failed to delete author");
            }
        });
    }
    mapAuthorFromDatabase(author) {
        return {
            name: author.name,
            birth_date: author.birth_date,
            nationality: author.nationality,
            famous_works: author.famous_works.map(work => ({
                title: work.title,
                year: work.year
            })),
        };
    }
}
exports.AuthorMongoModel = AuthorMongoModel;
