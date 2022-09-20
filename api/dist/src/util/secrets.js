"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
else {
    logger_1.default.debug('Using .env.example file to supply config environment variables');
    dotenv_1.default.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
exports.ENVIRONMENT = process.env.NODE_ENV;
const prod = exports.ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
exports.JWT_SECRET = process.env['JWT_SECRET'];
exports.POSTGRES_URI = process.env['POSTGRES_URI'];
exports.MONGODB_URI = process.env['MONGODB_URI_LOCAL'];
exports.DB_USER = process.env['DB_USER'];
exports.DEV_DB_URL = process.env['DEV_DB_URL'];
exports.DB_HOST = process.env['DB_HOST'];
exports.DB = process.env['DB'];
exports.DB_PASSWORD = process.env['DB_PASSWORD'];
// Use this instead if you want to use local mongodb
// export const MONGODB_URI = (
//   prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL']
// ) as string
if (!exports.JWT_SECRET) {
    logger_1.default.error('No client secret. Set JWT_SECRET environment variable.');
    process.exit(1);
}
if (!exports.POSTGRES_URI) {
    if (prod) {
        logger_1.default.error('No POSTGRESQL connection string. Set POSTGRE_URI environment variable.');
    }
    else {
        logger_1.default.error('No POSTGRESQL connection string. Set POSTGRE_URI environment variable.');
    }
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map