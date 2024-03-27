import express, { Request, Response } from "express";
import { authorRouter } from "./routes/author";
import { bookRouter } from "./routes/book";
import cors from "cors";
import { Database } from "./database/MongoDb";
import { BookController } from "./controllers/book";
import { BookMongoModel } from "./model/book";
import { dbName, dbUri } from "../config";
import { AuthorController } from "./controllers/author";
import { AuthorMongoModel } from "./model/author";

const app = express();
const port = process.env.PORT ?? 3000

const db = new Database(dbUri, dbName);
const bookMongoModel = new BookMongoModel(db);
const authorMongoModel = new AuthorMongoModel(db);

app.use(async (req, res, next) => {
    await db.connect();
    next();
});

app.use(express.json());
app.use(cors());

app.use('/books', bookRouter(new BookController(bookMongoModel)));
app.use('/authors', authorRouter(new AuthorController(authorMongoModel)));

app.get('/health', async (req: Request, res: Response) => {
    try {
        const isDatabaseHealthy = await db.checkDatabase();
        if (isDatabaseHealthy) {
            res.status(200).send('API is healthy');
        } else {
            res.status(500).send('Database is not healthy');
        }
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).send('Health check failed');
    }
});

app.use(async (req, res, next) => {
    await db.close();
    next();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))