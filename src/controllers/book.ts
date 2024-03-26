import { Request, Response } from "express";
import { BookMongoModel } from "../model/book";

export class BookController {
    private bookModel: BookMongoModel;

    constructor(bookModel: BookMongoModel) {
        this.bookModel = bookModel;
    }

    async getAll(req: Request, res: Response) {
        try {
            const books = await this.bookModel.getAll();
            return res.json(books);
        } catch (error) {
            console.error("Error getting all books:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const book = await this.bookModel.getById(id);

            if (!book) {
                return res.status(404).json({ message: `Book with ${id} ID not found.` });
            }

            return res.json(book);
        } catch (error) {
            console.error("Error getting book by id:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const result = await this.bookModel.create(req.body);

            return res.status(201).json(result);
        } catch (error) {
            console.error("Error creating book:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await this.bookModel.update(id, req.body);

            if (!result) {
                return res.status(404).json({ message: 'Book not found' });
            }

            return res.json(result);
        } catch (error) {
            console.error("Error updating book:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.bookModel.delete(id);
            return res.json({ message: "Book deleted successfully" });
        } catch (error) {
            console.error("Error deleting book:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
