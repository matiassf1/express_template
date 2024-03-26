import { MongoClient } from 'mongodb';

export class Database {
    private client: MongoClient | null = null;
    private uri: string;

    constructor(uri: string) {
        this.uri = uri;
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

    getClient(): MongoClient {
        if (!this.client) {
            throw new Error('La conexión a la base de datos no ha sido establecida.');
        }
        return this.client;
    }
}