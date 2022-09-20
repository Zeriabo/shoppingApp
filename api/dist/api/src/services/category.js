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
const createCategory = (cat) => __awaiter(void 0, void 0, void 0, function* () {
    const response = server_1.client.query('INSERT  INTO public."category"(name,image)  VALUES($1,$2)', [cat.name, cat.image], (err, result) => {
        if (err) {
            return err;
        }
        else {
            return result;
        }
    });
});
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT * FROM public."category" ORDER BY id ASC');
    return response.rows;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.client
        .query('SELECT * FROM public."category" where id= $1', [id])
        .then((results) => {
        if (results.rows == 0) {
            return 'no category';
        }
        else {
            return results.rows;
        }
    })
        .catch((err) => {
        return err;
    });
});
exports.default = {
    createCategory,
    getCategories,
    getSingleCategory,
};
//# sourceMappingURL=category.js.map