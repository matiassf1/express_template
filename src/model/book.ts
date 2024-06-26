import { Collection, ObjectId, WithId } from "mongodb";
import { Book, filterParamsBookType,  } from "../schemas/book";
import { Database } from "../database/MongoDb";

export class BookMongoModel {
    private booksCollection: Collection;

    constructor(booksDb: Database) {
        this.booksCollection = booksDb.getDb().collection('books');
    }

    async get(filterParams: filterParamsBookType): Promise<Book[]> {
        try {
            let query: any = { title: { $regex: filterParams.searchQuery, $options: 'i' } };

            if (filterParams.genres && filterParams.genres.length > 0) {
                query.genre = { $in: filterParams.genres };
            }

            const sort = filterParams.sort.length > 0 ? filterParams.sort : 'title'

            const books = await this.booksCollection.find(query)
                .skip(filterParams.skip)
                .limit(filterParams.limit)
                .sort(sort)
                .toArray() as WithId<Book>[];

            const booksMapped: Book[] = books.map((book) => this.mapBookFromDatabase(book));

            return booksMapped;
        } catch (error) {
            console.error("Error getting all books:", error);
            throw new Error("Failed to retrieve books");
        }
    }

    async getById(id: string): Promise<Book | null> {
        try {
            const book = await this.booksCollection.findOne({ _id: new ObjectId(id) }) as WithId<Book>;
            return book ? this.mapBookFromDatabase(book) : null;
        } catch (error) {
            console.error("Error getting book by id:", error);
            throw new Error("Failed to retrieve book");
        }
    }

    async create(book: Book): Promise<Book> {
        try {
            await this.booksCollection.insertOne(book);
            return book;
        } catch (error) {
            console.error("Error creating book:", error);
            throw new Error("Failed to create book");
        }
    }

    async update(id: string, updatedBook: Partial<Book>): Promise<Book> {
        try {
            const book = await this.getById(id);
            if (!book) {
                throw new Error("Book not found");
            }

            const mergedBook = { ...book, ...updatedBook };
            await this.booksCollection.updateOne({ _id: new ObjectId(id) }, { $set: mergedBook });
            return mergedBook;
        } catch (error) {
            console.error("Error updating book:", error);
            throw new Error("Failed to update book");
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.booksCollection.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error deleting book:", error);
            throw new Error("Failed to delete book");
        }
    }

    private mapBookFromDatabase(book: WithId<Book>): Book {
        return {
            id: book._id.toHexString(),
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year,
            isbn: book.isbn,
            publisher: book.publisher,
        };
    }
}
