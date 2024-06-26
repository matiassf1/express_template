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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_1 = require("./routes/author");
const book_1 = require("./routes/book");
const cors_1 = __importDefault(require("cors"));
const MongoDb_1 = require("./database/MongoDb");
const book_2 = require("./controllers/book");
const book_3 = require("./model/book");
const config_1 = require("../config");
const author_2 = require("./controllers/author");
const author_3 = require("./model/author");
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const db = new MongoDb_1.Database(config_1.dbUri, config_1.dbName);
const bookMongoModel = new book_3.BookMongoModel(db);
const authorMongoModel = new author_3.AuthorMongoModel(db);
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.connect();
    next();
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/books', (0, book_1.bookRouter)(new book_2.BookController(bookMongoModel)));
app.use('/authors', (0, author_1.authorRouter)(new author_2.AuthorController(authorMongoModel)));
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDatabaseHealthy = yield db.checkDatabase();
        if (isDatabaseHealthy) {
            res.status(200).send('API is healthy');
        }
        else {
            res.status(500).send('Database is not healthy');
        }
    }
    catch (error) {
        console.error('Health check failed:', error);
        res.status(500).send('Health check failed');
    }
}));
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.close();
    next();
}));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
