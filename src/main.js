import express, { json } from 'express'
import { booksRouter } from './routes/books'
import { authorsRouter } from './routes/authors';

const app = express()
const port = process.env.PORT ?? 3000

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))