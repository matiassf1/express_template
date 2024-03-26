import { Request, Response } from "express";
import { Author, validateAuthor, validatePartialAuthor } from "../schemas/author";

const authors = [
    {
        "id": "1",
        "name": "Gabriel García Márquez",
        "birth_date": "1927-03-06",
        "nationality": "Colombiano",
        "famous_works": [
            {
                "title": "Cien años de soledad",
                "year": 1967
            },
            {
                "title": "El amor en los tiempos del cólera",
                "year": 1985
            }
        ]
    },
    {
        "id": "2",
        "name": "George Orwell",
        "birth_date": "1903-06-25",
        "nationality": "Británico",
        "famous_works": [
            {
                "title": "1984",
                "year": 1949
            },
            {
                "title": "Rebelión en la granja",
                "year": 1945
            }
        ]
    },
    {
        "id": "3",
        "name": "J.R.R. Tolkien",
        "birth_date": "1892-01-03",
        "nationality": "Británico",
        "famous_works": [
            {
                "title": "El Señor de los Anillos: La Comunidad del Anillo",
                "year": 1954
            },
            {
                "title": "El Hobbit",
                "year": 1937
            }
        ]
    }
]


export class AuthorController {

    static async getAll(req: Request, res: Response) {
        try {
            return res.json(authors);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const author = authors.find((author: Author) => author.id === id);

            if (!author) return res.status(404).json({ message: `Author with ${id} ID not found.` })

            return res.json(author);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const result = validateAuthor(req.body);

            if (!result.success) {
                return res.status(400).json({ error: result });
            }

            const newAuthor: Author = result.data;
            authors.push(newAuthor);

            res.status(201).json(newAuthor);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = validatePartialAuthor(req.body);

            if (!result.success) {
                return res.status(400).json({ error: result });
            }

            const authorIndex = authors.findIndex((author: Author) => author.id === id);
            if (authorIndex === -1) {
                return res.status(404).json({ message: 'Author not found' });
            }

            const updatedAuthor: Author = {
                ...authors[authorIndex],
                ...result.data
            };

            authors[authorIndex] = updatedAuthor;

            return res.json(updatedAuthor);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const authorIndex = authors.findIndex((author: Author) => author.id === id);

            if (authorIndex === -1) {
                return res.status(404).json({ message: 'Author not found' });
            }

            const deletedAuthor = authors.splice(authorIndex, 1)[0];

            return res.json(deletedAuthor);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
