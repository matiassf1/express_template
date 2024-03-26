import { MongoClient, Db } from 'mongodb';

export class Database {
    private client: MongoClient | null = null;
    private uri: string;
    private dbName: string;

    constructor(uri: string, dbName: string) {
        this.uri = uri;
        this.dbName = dbName;
    }

    async connect(): Promise<void> {
        try {
            this.client = new MongoClient(this.uri);
            await this.client.connect();
            console.log('Conexión establecida correctamente');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    }

    async close(): Promise<void> {
        try {
            if (this.client) {
                await this.client.close();
                console.log('Conexión cerrada correctamente');
            } else {
                console.log('No hay conexión abierta para cerrar');
            }
        } catch (error) {
            console.error('Error al cerrar la conexión:', error);
        }
    }

    getDb(): Db {
        if (!this.client) {
            throw new Error('La conexión a la base de datos no ha sido establecida.');
        }
        return this.client.db(this.dbName);
    }
}
