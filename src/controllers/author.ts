import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { AuthorMongoModel } from "../model/author";
import { Author, filterParamsAuthorType, validateAuthor, validatePartialAuthor } from "../schemas/author";
import { PaginatedResult, PaginationDTO } from "../common/pagination";

export class AuthorController {
    private authorModel: AuthorMongoModel;

    constructor(authorModel: AuthorMongoModel) {
        this.authorModel = authorModel;
    }

    async get(req: Request, res: Response) {
        try {
            const paginationDTO = new PaginationDTO<Author>();
            const { limit, skip, sort } = paginationDTO.paginate(req.query);
            const searchQuery = paginationDTO.search(req.query);

            const filterParams: filterParamsAuthorType = { limit, skip, searchQuery, sort }
            const authors = await this.authorModel.get(filterParams);

            const result: PaginatedResult<Author> = paginationDTO.paginate(req.query);
            result.data = authors;

            return res.json(result);
        } catch (error) {
            console.error("Error getting all authors:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const author = await this.authorModel.getById(id);

            if (!author) {
                return res.status(404).json({ message: `Author with ${id} ID not found.` });
            }

            return res.json(author);
        } catch (error) {
            console.error("Error getting author by id:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const result = validateAuthor(req.body);

            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }

            const newAuthor: Author = {
                ...result.data,
                id: uuidv4()
            }
            
            const createdAuthor = await this.authorModel.create(newAuthor);

            return res.status(201).json(createdAuthor);
        } catch (error) {
            console.error("Error creating author:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = validatePartialAuthor(req.body);

            if (!result.success) {
                return res.status(400).json({ error: result.error });
            }

            const updatedData: Partial<Author> = result.data;
            const updatedAuthor = await this.authorModel.update(id, updatedData);

            if (!updatedAuthor) {
                return res.status(404).json({ message: 'Author not found' });
            }

            return res.json(updatedAuthor);
        } catch (error) {
            console.error("Error updating author:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.authorModel.delete(id);
            return res.json({ message: "Author deleted successfully" });
        } catch (error) {
            console.error("Error deleting author:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}