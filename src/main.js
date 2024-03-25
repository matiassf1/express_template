import express, { json } from 'express'
import { booksRouter } from './routes/books'
import { authorsRouter } from './routes/authors';
import { corsMiddleware } from './middlewares/cors';

const app = express()
const port = process.env.PORT ?? 3000

app.use(json());
app.use(corsMiddleware());

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))