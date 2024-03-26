import { Collection, Db, ObjectId, WithId } from "mongodb";
import { Book } from "../schemas/book";

export class BookMongoModel {
    private booksCollection: Collection;

    constructor(booksDb: Db) {
        this.booksCollection = booksDb.collection('books')
    }

    async getAll(): Promise<Book[]> {
        try {
            const booksWithIds = await this.booksCollection.find().toArray() as WithId<Book>[];

            const books: Book[] = booksWithIds.map((bookWithId) => ({
                id: bookWithId._id.toHexString(),
                title: bookWithId.title,
                author: bookWithId.author,
                genre: bookWithId.genre,
                year: bookWithId.year,
                isbn: bookWithId.isbn,
                publisher: bookWithId.publisher,
            }));
            return books;
        } catch (error) {
            console.error("Error getting all books:", error);
            return [];
        }
    }


    async getById(id: string): Promise<Book | null> {
        const book = await this.booksCollection.findOne({ _id: new ObjectId(id) }) as WithId<Book>
        return book ?? null;
    }

    async create(book: Book): Promise<Book> {
        await this.booksCollection.insertOne(book);
        return book;
    }

    async update(id: string, newBook: any) { //create dto to updateBooks
        const book = await this.booksCollection.findOne({ _id: new ObjectId(id) }) as WithId<Book>;
        if (!book) {
            throw new Error("Book not found");
        }

        newBook = {
            ...book,
            ...newBook
        };

        await this.booksCollection.updateOne({ _id: new ObjectId(id) }, newBook);
        return newBook
    }

    async delete(id: string): Promise<void> {
        await this.booksCollection.deleteOne({ _id: new ObjectId(id) });
    }

}