"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const pg_1 = require("pg");
const secrets_1 = require("./util/secrets");
const logger_1 = __importDefault(require("./util/logger"));
const product_1 = __importDefault(require("./services/product"));
exports.client = new pg_1.Client({
    user: secrets_1.DB_USER,
    host: secrets_1.DB_HOST,
    database: secrets_1.ENVIRONMENT == 'production' ? secrets_1.DB : secrets_1.DB,
    password: secrets_1.DB_PASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: false },
});
exports.client.connect(function (err) {
    if (err) {
        console.log('Database connection Error: ' + err);
        throw err;
    }
    else {
        console.log(' Database Connected!');
    }
});
if (process.env.NODE_ENV === 'development') {
    app_1.default.use(errorhandler_1.default());
}
// Start Express server
app_1.default.listen(app_1.default.get('port'), () => {
    console.log('  App is running at port:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
    console.log('  Press CTRL-C to stop\n');
    product_1.default.fillProducts()
        .then((result) => {
        logger_1.default.info('products are successffuly filled');
    })
        .catch((err) => {
        console.log(err);
    });
});
//# sourceMappingURL=server.js.map