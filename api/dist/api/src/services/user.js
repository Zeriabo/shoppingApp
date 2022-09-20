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
const server_1 = require("../server");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT * FROM public."user" ORDER BY id ASC');
    return response.rows;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT * FROM public."user" where id= $1', [id]);
    return response.rows;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT * FROM public."user" where  email=$1', [email]);
    return response.rows;
});
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const [firstname, lastname] = newUser.user.name.split(' ');
    server_1.client.query('INSERT INTO  public."user"("firstname","lastname","email","passwordhash",admin) VALUES($1,$2,$3,$4,$5)', [firstname, lastname, newUser.user.email, null, newUser.user.admin ? 1 : 0], (err, result) => {
        if (err) {
            console.log(err);
            return err;
        }
        else {
            return result;
        }
    });
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('DELETE FROM public."user" where id= $1', [id]);
    return response.rowCount > 0;
});
const updateUser = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const toUpdate = yield server_1.client.query('SELECT * FROM public."user" where id= $1', [id]);
    if (toUpdate.rowCount > 0) {
        let firstName = update.firstName;
        let lastName = update.lastName;
        let mobile = update.mobile;
        let email = update.email;
        let password = update.password;
        let admin = update.admin;
        if (firstName == null) {
            firstName = toUpdate.rows[0].firstName;
        }
        if (lastName == null) {
            lastName = toUpdate.rows[0].lastName;
        }
        if (mobile == null) {
            mobile = toUpdate.rows[0].mobile;
        }
        if (email == null) {
            email = toUpdate.rows[0].email;
        }
        if (password == null) {
            password = toUpdate.rows[0].passwordHash;
        }
        if (admin == null) {
            admin = toUpdate.rows[0].admin;
        }
        server_1.client.query('UPDATE  public."user" SET "firstname"=$1,"lastname"=$2,"mobile"=$3,"email"=$4,"passwordhash"=$5,"admin"=$6 where id= $7', [firstName, lastName, mobile, email, password, admin, id], (err, result) => {
            if (err) {
                console.log(err);
                return err;
            }
            else {
                return result;
            }
        });
    }
    else {
        console.log('User not found');
        return new Error('User not found');
    }
});
exports.default = {
    getUsers,
    getSingleUser,
    getUserByEmail,
    createUser,
    deleteUser,
    updateUser,
};
//# sourceMappingURL=user.js.map