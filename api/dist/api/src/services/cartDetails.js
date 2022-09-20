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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const logger_1 = __importDefault(require("../util/logger"));
const insertProductToCart = (cartId, productId, quantity, price, discount) => __awaiter(void 0, void 0, void 0, function* () {
    server_1.client.query('INSERT  INTO  public."cartDetails"("cartId","productId",quantity,price,discount) VALUES($1,$2,$3,$4,$5)', [
        cartId,
        productId,
        quantity,
        price * quantity - (price * quantity * discount) / 100,
        discount,
    ], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (results) {
            if (results.rowCount > 0) {
                const tablename = 'public."cartDetails"';
                const response = yield server_1.client.query("SELECT CURRVAL(pg_get_serial_sequence($1,'id'))", [tablename]);
                const currValue = Number(response.rows[0].currval);
                server_1.client.query('UPDATE public."cart" SET "cartDetailsId"=$1 WHERE id=$2', [currValue, cartId], (error, result) => {
                    if (error) {
                        //record error in the error file
                        logger_1.default.error(error.detail);
                        return error;
                    }
                });
            }
            return results;
        }
        if (error) {
            console.log(error);
            //record error in the error file
            logger_1.default.error(error.detail);
            return error;
        }
    }));
});
const addProductToCart = (cartId, productId, quantity, price, discount) => __awaiter(void 0, void 0, void 0, function* () {
    //SET quantity=$1
    server_1.client
        .query('SELECT * FROM public."cartDetails" where "cartId"=$1 And "productId"=$2', [cartId, productId])
        .then((res) => {
        if (res.rowCount > 0) {
            server_1.client
                .query('UPDATE public."cartDetails" SET "quantity"="quantity"+$3,"price"=$4*("quantity"+$3)-($4*("quantity"+$3)*$5/100) where "cartId"=$1 And "productId"=$2', [cartId, productId, quantity, price, discount])
                .then((res) => (res.rowCount > 0 ? true : false));
        }
        else {
            server_1.client.query('INSERT  INTO  public."cartDetails"("cartId","productId",quantity,price,discount) VALUES($1,$2,$3,$4,$5)', [
                cartId,
                productId,
                quantity,
                price * quantity - (price * quantity * discount) / 100,
                discount,
            ]);
        }
    })
        .catch((err) => logger_1.default.error(err));
    // client.query(
    //   'INSERT  INTO  public."cartDetails"("cartId","productId",quantity,price,discount) VALUES($1,$2,$3,$4,$5)',
    //   [cartId,cartDetailsId, productId, quantity],
    //   (error: any, results: any) => {
    //     if (error) {
    //       //record error in the error file
    //       logger.error(error.detail)
    //       throw error
    //     }
    //     return results
    //   }
    // )
});
const removeProductFromCart = (productId, cartId) => {
    server_1.client.query('SELECT * FROM public."cartDetails"  WHERE  "productId"=$1 AND "cartId"=$2 ', [productId, cartId], (error, results) => {
        if (error) {
            //record error in the error file
            logger_1.default.error(error.detail);
            throw error;
        }
        console.log('results.rowCount');
        console.log(results.rows[0]);
        if (results.rowCount == 1) {
            if (Number(results.rows[0].quantity) > 1) {
                server_1.client.query('Update public."cartDetails" SET "quantity"="quantity"-1, "price"="price"-(Select "price"*"discount"/100 from product where "id"=$1) WHERE  "productId"=$1 ', [productId], (error, results) => {
                    if (error) {
                        //record error in the error file
                        logger_1.default.error(error.detail);
                        throw error;
                    }
                    return results;
                });
            }
            else {
                server_1.client.query('DELETE FROM public."cartDetails"  WHERE  "productId"=$1 ', [productId], (error, results) => {
                    if (error) {
                        //record error in the error file
                        logger_1.default.error(error.detail);
                        throw error;
                    }
                    return results;
                });
            }
            return results;
        }
        else {
            return new Error('not found');
        }
    });
};
const getCartDetailsID = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT  id FROM public."cartDetails" cartdetails WHERE cartdetails."cartId"=$1', [cartId]);
    console.log(response.rows);
    return response.rows;
});
const getCartDetails = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT  cartdetails.quantity::int, product.id, product.category,product.description,product.image,product.price, product.title, cartdetails.price as total FROM public."cartDetails" cartdetails, public."product" product  WHERE "cartId"=$1 And cartdetails."productId"=product."id"', [cartId]);
    console.log(response.rows);
    return response.rows;
});
const getTotalCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    cartId = Number(cartId);
    const response = yield server_1.client.query('SELECT  SUM(price)FROM public."cartDetails" where "cartId"=$1', [cartId]);
    return response.rows[0];
});
const deleteCartDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('DELETE FROM public."cartDetails" where "cartId"= $1', [id]);
    return response.rowCount > 0;
});
const checkProductExists = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield server_1.client.query('SELECT * FROM public."cartDetails" where "productId"= $1', [productId]);
    return response.rowCount > 0;
});
const updateCartDetail = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const toUpdate = yield server_1.client.query('SELECT * FROM public."cart" where id= $1', [id]);
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
    insertProductToCart,
    addProductToCart,
    getCartDetails,
    deleteCartDetail,
    updateCartDetail,
    removeProductFromCart,
    getTotalCart,
    getCartDetailsID,
    checkProductExists,
};
//# sourceMappingURL=cartDetails.js.map