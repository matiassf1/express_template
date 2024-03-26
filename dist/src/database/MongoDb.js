"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
class Database {
    constructor(uri, dbName) {
        this.client = null;
        this.uri = uri;
        this.dbName = dbName;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client = new mongodb_1.MongoClient(this.uri);
                yield this.client.connect();
                console.log('Conexión establecida correctamente');
            }
            catch (error) {
                console.error('Error al conectar a la base de datos:', error);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.client) {
                    yield this.client.close();
                    console.log('Conexión cerrada correctamente');
                }
                else {
                    console.log('No hay conexión abierta para cerrar');
                }
            }
            catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        });
    }
    getDb() {
        if (!this.client) {
            throw new Error('La conexión a la base de datos no ha sido establecida.');
        }
        return this.client.db(this.dbName);
    }
}
exports.Database = Database;
