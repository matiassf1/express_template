"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbName = exports.dbUri = void 0;
exports.dbUri = process.env.DBuri || '';
exports.dbName = process.env.DBName || '';
