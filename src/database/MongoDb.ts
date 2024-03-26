import { MongoClient, Db } from 'mongodb';

export class Database {
    private client: MongoClient | null = null;
    private uri: string;
    private dbName: string;

    constructor(uri: string, dbName: string) {
        this.uri = uri;
        this.dbName = dbName;
        this.connect();
    }

    async connect(): Promise<void> {
        try {
            this.client = new MongoClient(this.uri);
            await this.client.connect();
            console.log('Connection established successfully');
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }

    async close(): Promise<void> {
        try {
            if (this.client) {
                await this.client.close();
                console.log('Connection closed successfully');
            } else {
                console.log('No open connection to close');
            }
        } catch (error) {
            console.error('Error closing the connection:', error);
        }
    }

    getDb(): Db {
        if (!this.client) {
            throw new Error('Database connection has not been established.');
        }
        return this.client.db(this.dbName);
    }
}
