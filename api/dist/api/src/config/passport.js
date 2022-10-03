"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const server_1 = require("../server");
require('dotenv').config();
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
function getDate() {
    const dateTime = new Date();
    // get current date
    // adjust 0 before single digit date
    const date = ('0' + dateTime.getDate()).slice(-2);
    // get current month
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    // get current year
    const year = dateTime.getFullYear();
    // get current hours
    const hours = dateTime.getHours();
    // get current minutes
    const minutes = dateTime.getMinutes();
    // get current seconds
    const seconds = dateTime.getSeconds();
    // prints date in YYYY-MM-DD format
    console.log(year + '-' + month + '-' + date);
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return (year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds);
}
exports.myPassport = passport_1.default.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3050/api/v1/users/auth/google/callback',
}, function (request, accessToken, refreshToken, profile, cb) {
    const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.email,
        avatar: profile.picture,
    };
    console.log(profile);
    console.log(user);
    if (profile.verified) {
        server_1.client.query('SELECT * FROM federated_credentials WHERE email = $1 ', [user.email], function (err, cred) {
            if (err) {
                cb(null, err);
            }
            if (cred) {
                if (cred.rowCount == 0) {
                    server_1.client.query('INSERT INTO  federated_credentials(name,email, profile_id, avatar) VALUES($1,$2,$3,$4) ', [user.name, user.email, user.id, user.avatar], function (err, res) {
                        if (err) {
                            cb(null, err);
                        }
                    });
                }
                else if (cred.rowCount == 1) {
                    server_1.client.query('Update federated_credentials SET avatar=$1 where email=$2 ', [user.avatar, user.email], function (err, res) {
                        if (err) {
                            cb(null, err);
                        }
                    });
                }
            }
        });
        if (user.id != null) {
            //here to check the user table
            server_1.client.query('Select * FROM  public."users" where email=$1', [user.email], function (err, res) {
                if (err) {
                    console.log(null, err);
                }
                if (res) {
                    //  console.log(res)
                    if (res.rowCount > 0) {
                        //user existsgi
                    }
                    if (res.rowCount == 0) {
                        //user does not exists
                        console.log(user);
                        const [firstname, lastname] = user.name.split(' ');
                        console.log(firstname);
                        console.log(lastname);
                        server_1.client.query('INSERT INTO  public."users"(firstname,lastname,email,admin,lastlogin,passwordhash) VALUES($1,$2,$3,$4,$5,$6) ', [firstname, lastname, user.email, 0, getDate(), null], function (err, res) {
                            console.log(err);
                            if (err) {
                                cb(null, err);
                            }
                            if (res) {
                                console.log(res);
                            }
                        });
                    }
                }
            });
            cb(null, user);
        }
        else {
            cb(null, new Error('Something wrong'));
        }
    }
    else {
        cb(null, new Error('Something wrong'));
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=passport.js.map