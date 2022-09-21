"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint @typescript-eslint/no-var-requires: "off" */
const express_1 = __importDefault(require("express"));
// import lusca from 'lusca' will be usedç later
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const product_1 = __importDefault(require("./routers/product"));
const cart_1 = __importDefault(require("./routers/cart"));
const category_1 = __importDefault(require("./routers/category"));
const user_1 = __importDefault(require("./routers/user"));
const cartDetail_1 = __importDefault(require("./routers/cartDetail"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const swagger_1 = __importDefault(require("./util/swagger"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
require('./config/passport');
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
dotenv_1.default.config({ path: '.env' });
console.log(__dirname);
const app = express_1.default();
const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(',')
    : [];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors_1.default(corsOptions));
const port = process.env.PORT || 5001;
const env = process.env;
console.log('port' + env.PORT);
app.use(express_session_1.default({
    secret: 'eminem',
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24),
    },
}));
app.use(express_1.default.static('public'));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session()); // persistent login sessions
// Express configuration
app.set('port', port);
// Global middleware
app.use(apiContentType_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(cookie_parser_1.default());
// Set up routers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/v1/carts', cart_1.default);
app.use('/v1/category', category_1.default);
app.use('/v1/products', product_1.default);
app.use('/v1/users', user_1.default);
app.use('/v1/cartdetails', cartDetail_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
// Couple the application to the Swagger module.
swagger_1.default(app, Number(port));
exports.default = app;
//# sourceMappingURL=app.js.map