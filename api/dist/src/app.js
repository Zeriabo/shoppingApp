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
const user_1 = __importDefault(require("./routers/user"));
const cartDetail_1 = __importDefault(require("./routers/cartDetail"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const swagger_1 = __importDefault(require("./util/swagger"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require('./config/passport');
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config({ path: '.env' });
const app = express_1.default();
app.use(cors_1.default());
const port = process.env.PORT || 5001;
//    // Retrieve user data using the access token received
//    app.get('/auth/google/callback', passport.authenticate("google",{
//     successRedirect:"http://localhost:3000",
//     failureRedirect:"/auth/callback/failure"
//    }));
// Success
// app.get('/auth/google/success' , (req:any , res) => {
//     if(!req.user)
//     {
// res.redirect('/auth/callback/failure');
//     }else{
//         res.send("failed " + req.user.email);
//     }
// });
// app.get('/logout', function (req, res) {
//     req.logOut();
//     res.redirect('/');
// });
//<em> profile route after successful sign in<em>
// app.get("/profile", (req, res) => {
//  res.send("Welcome"+res);
// });
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
app.use('/api/v1/carts', cart_1.default);
app.use('/api/v1/products', product_1.default);
app.use('/api/v1/users', user_1.default);
app.use('/api/v1/cartdetails', cartDetail_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
// Couple the application to the Swagger module.
swagger_1.default(app, Number(port));
exports.default = app;
//# sourceMappingURL=app.js.map