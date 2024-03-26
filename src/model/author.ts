import { Collection, ObjectId, WithId } from "mongodb";
import { Database } from "../database/MongoDb";
import { Author } from "../schemas/author";

export class AuthorMongoModel {
    private authorCollection: Collection;

    constructor(authorsDb: Database) {
        this.authorCollection = authorsDb.getDb().collection('authors');
    }

    async getAll(): Promise<Author[]> {
        try {
            const authorsWithIds = await this.authorCollection.find().toArray() as WithId<Author>[];
            
            const authors: Author[] = authorsWithIds.map((bookWithId) => this.mapAuthorFromDatabase(bookWithId));
            return authors;
        } catch (error) {
            console.error("Error getting all authors:", error);
            throw new Error("Failed to retrieve authors");
        }
    }

    async getById(id: string): Promise<Author | null> {
        try {
            const author = await this.authorCollection.findOne({ _id: new ObjectId(id) }) as WithId<Author>;
            return author ? this.mapAuthorFromDatabase(author) : null;
        } catch (error) {
            console.error("Error getting author by id:", error);
            throw new Error("Failed to retrieve author");
        }
    }

    async create(author: Author): Promise<Author> {
        try {
            await this.authorCollection.insertOne(author);
            return author;
        } catch (error) {
            console.error("Error creating author:", error);
            throw new Error("Failed to create author");
        }
    }

    async update(id: string, updatedAuthor: Partial<Author>): Promise<Author> {
        try {
            const author = await this.getById(id);
            if (!author) {
                throw new Error("Author not found");
            }

            const mergedAuthor = { ...author, ...updatedAuthor };
            await this.authorCollection.updateOne({ _id: new ObjectId(id) }, { $set: mergedAuthor });
            return mergedAuthor;
        } catch (error) {
            console.error("Error updating author:", error);
            throw new Error("Failed to update author");
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.authorCollection.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error deleting author:", error);
            throw new Error("Failed to delete author");
        }
    }

    private mapAuthorFromDatabase(author: WithId<Author>): Author {
        return {
            id: author._id.toHexString(),
            name: author.name,
            birth_date: author.birth_date,
            nationality: author.nationality,
            famous_works: author.famous_works.map(work => ({
                title: work.title,
                year: work.year
            })),
        };
    }
}
