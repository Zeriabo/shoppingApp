"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("./util/secrets");
const Pool = require('pg').Pool;
exports.pool = new Pool({
    user: secrets_1.DB_USER,
    host: secrets_1.DB_HOST,
    database: secrets_1.DB,
    password: secrets_1.DB_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});
//remove this and use the other connection one connecton !
//# sourceMappingURL=queries.js.map