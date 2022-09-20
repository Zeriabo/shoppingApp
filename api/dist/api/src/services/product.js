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
const axios = require('axios').default;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT id,title,price,discount,quantity ::INTEGER,category,image,description FROM public."product"  ORDER BY id ASC');
    return response.rows;
});
const getProductsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT id,title,price,discount,quantity ::INTEGER,category,image,description FROM public."product" where category=$1', [category]);
    return response.rows;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT * FROM public."product" where id= $1', [id]);
    return response.rows;
});
const fillProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT * FROM public."product"');
    let discount = 0.0;
    var newlyCreatedCategoryId = null;
    const res = yield response;
    if (res.rowCount == 0) {
        try {
            axios
                .get('https://fakestoreapi.com/products')
                .then((response) => {
                response.data.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
                    if (product.rating.rate % 1 != 0) {
                        discount = product.rating.rate * 10;
                    }
                    else {
                        discount = 5;
                    }
                    console.log(product.category);
                    yield server_1.client
                        .query('SELECT * FROM category WHERE name=$1', [product.category])
                        .then((qres) => __awaiter(void 0, void 0, void 0, function* () {
                        if (qres.rowCount == 0) {
                            yield server_1.client.query('INSERT INTO category(name) VALUES($1)', [product.category], function (err, result) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    if (err) {
                                        //handle error
                                        console.log(err);
                                    }
                                    else {
                                        const lastinsertedID = yield server_1.client.query('SELECT LAST_INSERT_ID()');
                                        console.log(lastinsertedID);
                                        console.log(result);
                                        console.log(result.rows[0].id);
                                        newlyCreatedCategoryId = result.rows[0].id;
                                        const productExists = yield server_1.client.query('SELECT * FROM product WHERE name=$1', [product.name]);
                                        if ((productExists.rowCount = 0)) {
                                            yield server_1.client.query('INSERT INTO  public."product"(title, price, discount, quantity,description, category, image) VALUES($1,$2,$3,$4,$5,$6,$7)', [
                                                product.title,
                                                product.price,
                                                product.rating.rate * 10,
                                                product.rating.count,
                                                product.description,
                                                newlyCreatedCategoryId,
                                                product.image,
                                            ], (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                    return err;
                                                }
                                                else {
                                                    return result;
                                                }
                                            });
                                        }
                                    }
                                });
                            });
                        }
                        else {
                            newlyCreatedCategoryId = qres.rows[0].id;
                            yield server_1.client.query('INSERT INTO  public."product"(title, price, discount, quantity,description, category, image) VALUES($1,$2,$3,$4,$5,$6,$7)', [
                                product.title,
                                product.price,
                                product.rating.rate * 10,
                                product.rating.count,
                                product.description,
                                newlyCreatedCategoryId,
                                product.image,
                            ], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    return err;
                                }
                                else {
                                    return result;
                                }
                            });
                        }
                    }));
                }));
            })
                .catch(function (err) {
                console.log('Unable to fill -', err);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    return response;
});
const createProduct = (newProduct) => {
    server_1.client.query('INSERT INTO  public."product"(title,price,discount,quantity) VALUES($1,$2,$3,$4)', [
        newProduct.title,
        newProduct.price,
        newProduct.discount,
        newProduct.quantity,
    ], (err, result) => {
        if (err) {
            return err;
        }
        else {
            return result;
        }
    });
};
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('DELETE FROM public."product" where id= $1', [id]);
    return response.rowCount > 0;
});
const updateProduct = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const toUpdate = yield server_1.client.query('SELECT * FROM public."product" where id= $1', [id]);
    let updated = false;
    let response = null;
    const err = {
        message: 'Product not found!',
    };
    if (toUpdate.rows.length > 0) {
        let title = update.title;
        let price = update.price;
        let discount = update.discount;
        let quantity = update.quantity;
        if (title == null) {
            title = toUpdate.rows[0].title;
        }
        if (price == null) {
            price = toUpdate.rows[0].price;
        }
        if (discount == null) {
            discount = toUpdate.rows[0].discount;
        }
        if (quantity == null) {
            quantity = toUpdate.rows[0].quantity;
        }
        response = yield server_1.client.query('UPDATE  public."product" SET title=$1,price=$2,discount=$3,quantity=$4 where id= $5', [title, price, discount, quantity, id]);
        if (response.rowCount > 0) {
            updated = true;
        }
        return updated;
    }
    else {
        return err;
    }
});
exports.default = {
    getProducts,
    getSingleProduct,
    getProductsByCategory,
    createProduct,
    deleteProduct,
    updateProduct,
    fillProducts,
};
//# sourceMappingURL=product.js.map