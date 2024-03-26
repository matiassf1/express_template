import express from "express";
import { authorRouter } from "./routes/author";
import { bookRouter } from "./routes/book";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 3000

app.use(express.json());
app.use(cors());

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))