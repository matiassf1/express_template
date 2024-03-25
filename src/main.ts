import express, { json, Application } from 'express'
import { bookRouter } from './routes/book'
import { authorRouter } from './routes/author';
import { corsMiddleware } from './middlewares/cors';

const app: Application = express()
const port = process.env.PORT ?? 3000

app.use(json());
app.use(corsMiddleware());

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))