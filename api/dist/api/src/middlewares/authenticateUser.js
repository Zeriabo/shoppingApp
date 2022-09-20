"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport_1 = require("../config/passport");
exports.logRequest = (req, res, next) => {
    console.log('i am middle ware ');
    next();
};
exports.authenticateUser = (req, res, next) => {
    const { username, password } = req.body;
    const user = { username, password };
    passport_1.myPassport.authenticate('google', {
        failureRedirect: '/login',
        failureMessage: true,
    });
    console.log(user);
    next(user);
};
//# sourceMappingURL=authenticateUser.js.map