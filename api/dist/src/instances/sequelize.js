"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("../util/secrets");
const sequelize_1 = require("sequelize");
let sqdatabase = null;
if (secrets_1.ENVIRONMENT == 'production') {
    sqdatabase = new sequelize_1.Sequelize({
        dialect: 'postgres',
        host: secrets_1.DB_HOST,
        port: 5432,
        database: secrets_1.DB,
        username: secrets_1.DB_USER,
        password: secrets_1.DB_PASSWORD,
    });
}
else {
    sqdatabase = new sequelize_1.Sequelize({
        dialect: 'postgres',
        host: secrets_1.DEV_DB_URL,
        port: 5432,
        database: secrets_1.DB,
        username: secrets_1.DB_USER,
        password: secrets_1.DB_PASSWORD,
    });
}
exports.default = sqdatabase;
exports.sequelize = new sequelize_1.Sequelize(secrets_1.DB, secrets_1.DB_USER, secrets_1.DB_PASSWORD, {
    dialect: 'postgres',
    port: 5432,
});
module.exports = exports.sequelize;
//# sourceMappingURL=sequelize.js.map