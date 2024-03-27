import express, { Request, Response } from "express";
import { authorRouter } from "./routes/author";
import { bookRouter } from "./routes/book";
import cors from "cors";
import { uri } from "../config";
import { Database } from "./database/MongoDb";
import { BookController } from "./controllers/book";
import { BookMongoModel } from "./model/book";

const app = express();
const port = process.env.PORT ?? 3000

const db = new Database(uri, 'library');
const bookMongoModel = new BookMongoModel(db);

app.use(async (req, res, next) => {
    await db.connect();
    next();
});

app.use(express.json());
app.use(cors());

app.use('/books', bookRouter(new BookController(bookMongoModel)));
app.use('/authors', authorRouter);

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